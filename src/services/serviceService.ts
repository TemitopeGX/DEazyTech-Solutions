import { query, queryOne, transaction } from "@/lib/mysql";

export interface Service {
  id: number;
  title: string;
  description: string;
  image_url: string;
  features: string[];
  benefits: string[];
  created_at: string;
  updated_at: string;
}

export interface ServiceInput {
  title: string;
  description: string;
  image_url: string;
  features: string[];
  benefits: string[];
}

export async function getAllServices(): Promise<Service[]> {
  try {
    const services = (await query(
      "SELECT * FROM services ORDER BY created_at DESC"
    )) as any[];

    // Fetch features and benefits for each service
    const servicesWithDetails = await Promise.all(
      services.map(async (service) => {
        const features = (await query(
          "SELECT feature FROM service_features WHERE service_id = ?",
          [service.id]
        )) as any[];

        const benefits = (await query(
          "SELECT benefit FROM service_benefits WHERE service_id = ?",
          [service.id]
        )) as any[];

        return {
          ...service,
          features: features.map((f) => f.feature),
          benefits: benefits.map((b) => b.benefit),
        };
      })
    );

    return servicesWithDetails;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export async function getServiceById(id: number): Promise<Service | null> {
  try {
    const service = (await queryOne("SELECT * FROM services WHERE id = ?", [
      id,
    ])) as any;

    if (!service) return null;

    // Fetch features
    const features = (await query(
      "SELECT feature FROM service_features WHERE service_id = ?",
      [id]
    )) as any[];

    // Fetch benefits
    const benefits = (await query(
      "SELECT benefit FROM service_benefits WHERE service_id = ?",
      [id]
    )) as any[];

    return {
      ...service,
      features: features.map((f) => f.feature),
      benefits: benefits.map((b) => b.benefit),
    };
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
}

export async function createService(service: ServiceInput): Promise<Service> {
  return transaction(async (connection) => {
    try {
      // Insert service
      const [result]: any = await connection.execute(
        "INSERT INTO services (title, description, image_url) VALUES (?, ?, ?)",
        [service.title, service.description, service.image_url]
      );

      const serviceId = result.insertId;

      // Insert features
      if (service.features.length > 0) {
        const featureValues = service.features.map((feature) => [
          serviceId,
          feature,
        ]);
        await connection.query(
          "INSERT INTO service_features (service_id, feature) VALUES ?",
          [featureValues]
        );
      }

      // Insert benefits
      if (service.benefits.length > 0) {
        const benefitValues = service.benefits.map((benefit) => [
          serviceId,
          benefit,
        ]);
        await connection.query(
          "INSERT INTO service_benefits (service_id, benefit) VALUES ?",
          [benefitValues]
        );
      }

      // Fetch the created service
      const createdService = await getServiceById(serviceId);
      if (!createdService) throw new Error("Failed to create service");

      return createdService;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  });
}

export async function updateService(
  id: number,
  service: Partial<ServiceInput>
): Promise<void> {
  return transaction(async (connection) => {
    try {
      // Update service
      if (Object.keys(service).length > 0) {
        const updates = [];
        const values = [];

        if (service.title) {
          updates.push("title = ?");
          values.push(service.title);
        }
        if (service.description) {
          updates.push("description = ?");
          values.push(service.description);
        }
        if (service.image_url) {
          updates.push("image_url = ?");
          values.push(service.image_url);
        }

        if (updates.length > 0) {
          await connection.execute(
            `UPDATE services SET ${updates.join(", ")} WHERE id = ?`,
            [...values, id]
          );
        }
      }

      // Update features if provided
      if (service.features) {
        await connection.execute(
          "DELETE FROM service_features WHERE service_id = ?",
          [id]
        );

        if (service.features.length > 0) {
          const featureValues = service.features.map((feature) => [
            id,
            feature,
          ]);
          await connection.query(
            "INSERT INTO service_features (service_id, feature) VALUES ?",
            [featureValues]
          );
        }
      }

      // Update benefits if provided
      if (service.benefits) {
        await connection.execute(
          "DELETE FROM service_benefits WHERE service_id = ?",
          [id]
        );

        if (service.benefits.length > 0) {
          const benefitValues = service.benefits.map((benefit) => [
            id,
            benefit,
          ]);
          await connection.query(
            "INSERT INTO service_benefits (service_id, benefit) VALUES ?",
            [benefitValues]
          );
        }
      }
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  });
}

export async function deleteService(id: number): Promise<void> {
  try {
    // The foreign key constraints with ON DELETE CASCADE will automatically
    // delete related features and benefits
    await query("DELETE FROM services WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
}
