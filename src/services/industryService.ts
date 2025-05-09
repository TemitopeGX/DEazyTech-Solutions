import { query, queryOne, transaction } from "@/lib/mysql";

export interface Industry {
  id: number;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface IndustryInput {
  name: string;
  description: string;
  image_url: string;
}

export async function getAllIndustries(): Promise<Industry[]> {
  try {
    const industries = (await query(
      "SELECT * FROM industries ORDER BY created_at DESC"
    )) as Industry[];
    return industries;
  } catch (error) {
    console.error("Error fetching industries:", error);
    throw error;
  }
}

export async function getIndustryById(id: number): Promise<Industry | null> {
  try {
    const industry = (await queryOne("SELECT * FROM industries WHERE id = ?", [
      id,
    ])) as Industry | null;
    return industry;
  } catch (error) {
    console.error("Error fetching industry:", error);
    throw error;
  }
}

export async function createIndustry(
  industry: IndustryInput
): Promise<Industry> {
  return transaction(async (connection) => {
    try {
      const [result]: any = await connection.execute(
        "INSERT INTO industries (name, description, image_url) VALUES (?, ?, ?)",
        [industry.name, industry.description, industry.image_url]
      );

      const createdIndustry = await getIndustryById(result.insertId);
      if (!createdIndustry) throw new Error("Failed to create industry");

      return createdIndustry;
    } catch (error) {
      console.error("Error creating industry:", error);
      throw error;
    }
  });
}

export async function updateIndustry(
  id: number,
  industry: Partial<IndustryInput>
): Promise<void> {
  try {
    const updates = [];
    const values = [];

    if (industry.name) {
      updates.push("name = ?");
      values.push(industry.name);
    }
    if (industry.description) {
      updates.push("description = ?");
      values.push(industry.description);
    }
    if (industry.image_url) {
      updates.push("image_url = ?");
      values.push(industry.image_url);
    }

    if (updates.length > 0) {
      await query(`UPDATE industries SET ${updates.join(", ")} WHERE id = ?`, [
        ...values,
        id,
      ]);
    }
  } catch (error) {
    console.error("Error updating industry:", error);
    throw error;
  }
}

export async function deleteIndustry(id: number): Promise<void> {
  try {
    await query("DELETE FROM industries WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting industry:", error);
    throw error;
  }
}
