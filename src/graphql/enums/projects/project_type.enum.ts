import { registerEnumType } from "@nestjs/graphql";

export enum ProjectTypeEnum {
  ETHEREUM = "ETHEREUM",
  ETH2 = "ETH2",
  IPFS = "IPFS",
  FILECOIN = "FILECOIN",
}

registerEnumType(ProjectTypeEnum, {
  name: "ProjectTypeEnum",
});
