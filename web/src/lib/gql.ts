export interface CampaignDeployed {
  id: string;
  creator: string;
  campaignAddress: string;
  blockNumber: number;
  blockTimestamp: number;
}

export interface DataResponse {
  campaignDeployeds: CampaignDeployed[];
}
