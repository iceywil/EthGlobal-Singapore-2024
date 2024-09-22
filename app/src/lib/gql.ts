export interface CampaignDeployed {
  id: string;
  creator: string;
  campaignAddress: string;
  name: string;
  description: string;
  imageURL: string;
  tags: string[];
  raisingFor: string;
  need: string;
  beneficiary: string;
  goal: BigInt;
  duration: BigInt;
  yieldStrategy: string;
  blockNumber: number;
  blockTimestamp: number;
  transactionHash: string;
}

export interface DataResponse {
  campaignDeployeds: CampaignDeployed[];
}
