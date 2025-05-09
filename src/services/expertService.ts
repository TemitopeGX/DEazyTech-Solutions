import { query, queryOne, transaction } from "@/lib/mysql";

export interface Expert {
  id: number;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  experience: string;
  expertise: string[];
  created_at: string;
  updated_at: string;
}

export interface ExpertInput {
  name: string;
  role: string;
  bio: string;
  image_url: string;
  experience: string;
  expertise: string[];
}

export async function getAllExperts(): Promise<Expert[]> {
  try {
    const experts = (await query(
      "SELECT * FROM experts ORDER BY created_at DESC"
    )) as any[];

    // Fetch expertise for each expert
    const expertsWithExpertise = await Promise.all(
      experts.map(async (expert) => {
        const expertise = (await query(
          "SELECT expertise FROM expert_expertise WHERE expert_id = ?",
          [expert.id]
        )) as any[];

        return {
          ...expert,
          expertise: expertise.map((e) => e.expertise),
        };
      })
    );

    return expertsWithExpertise;
  } catch (error) {
    console.error("Error fetching experts:", error);
    throw error;
  }
}

export async function getExpertById(id: number): Promise<Expert | null> {
  try {
    const expert = (await queryOne("SELECT * FROM experts WHERE id = ?", [
      id,
    ])) as any;

    if (!expert) return null;

    // Fetch expertise
    const expertise = (await query(
      "SELECT expertise FROM expert_expertise WHERE expert_id = ?",
      [id]
    )) as any[];

    return {
      ...expert,
      expertise: expertise.map((e) => e.expertise),
    };
  } catch (error) {
    console.error("Error fetching expert:", error);
    throw error;
  }
}

export async function createExpert(expert: ExpertInput): Promise<Expert> {
  return transaction(async (connection) => {
    try {
      // Insert expert
      const [result]: any = await connection.execute(
        "INSERT INTO experts (name, role, bio, image_url, experience) VALUES (?, ?, ?, ?, ?)",
        [
          expert.name,
          expert.role,
          expert.bio,
          expert.image_url,
          expert.experience,
        ]
      );

      const expertId = result.insertId;

      // Insert expertise
      if (expert.expertise.length > 0) {
        const expertiseValues = expert.expertise.map((e) => [expertId, e]);
        await connection.query(
          "INSERT INTO expert_expertise (expert_id, expertise) VALUES ?",
          [expertiseValues]
        );
      }

      // Fetch the created expert
      const createdExpert = await getExpertById(expertId);
      if (!createdExpert) throw new Error("Failed to create expert");

      return createdExpert;
    } catch (error) {
      console.error("Error creating expert:", error);
      throw error;
    }
  });
}

export async function updateExpert(
  id: number,
  expert: Partial<ExpertInput>
): Promise<void> {
  return transaction(async (connection) => {
    try {
      // Update expert
      if (Object.keys(expert).length > 0) {
        const updates = [];
        const values = [];

        if (expert.name) {
          updates.push("name = ?");
          values.push(expert.name);
        }
        if (expert.role) {
          updates.push("role = ?");
          values.push(expert.role);
        }
        if (expert.bio) {
          updates.push("bio = ?");
          values.push(expert.bio);
        }
        if (expert.image_url) {
          updates.push("image_url = ?");
          values.push(expert.image_url);
        }
        if (expert.experience) {
          updates.push("experience = ?");
          values.push(expert.experience);
        }

        if (updates.length > 0) {
          await connection.execute(
            `UPDATE experts SET ${updates.join(", ")} WHERE id = ?`,
            [...values, id]
          );
        }
      }

      // Update expertise if provided
      if (expert.expertise) {
        // Delete existing expertise
        await connection.execute(
          "DELETE FROM expert_expertise WHERE expert_id = ?",
          [id]
        );

        // Insert new expertise
        if (expert.expertise.length > 0) {
          const expertiseValues = expert.expertise.map((e) => [id, e]);
          await connection.query(
            "INSERT INTO expert_expertise (expert_id, expertise) VALUES ?",
            [expertiseValues]
          );
        }
      }
    } catch (error) {
      console.error("Error updating expert:", error);
      throw error;
    }
  });
}

export async function deleteExpert(id: number): Promise<void> {
  try {
    await query("DELETE FROM experts WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting expert:", error);
    throw error;
  }
}
