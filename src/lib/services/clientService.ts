export interface Client {
  id: string;
  name: string;
  logo: string;
}

const defaultClients: Client[] = [
  {
    id: "1",
    name: "Google",
    logo: "https://www.vectorlogo.zone/logos/google/google-ar21.svg",
  },
  {
    id: "2",
    name: "Microsoft",
    logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg",
  },
  {
    id: "3",
    name: "IBM",
    logo: "https://www.vectorlogo.zone/logos/ibm/ibm-ar21.svg",
  },
  {
    id: "4",
    name: "Amazon",
    logo: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg",
  },
  {
    id: "5",
    name: "Meta",
    logo: "https://www.vectorlogo.zone/logos/meta/meta-ar21.svg",
  },
];

export async function getAllClients(): Promise<Client[]> {
  // In a real application, this would fetch from an API
  // For now, we'll return the default clients
  return defaultClients;
}
