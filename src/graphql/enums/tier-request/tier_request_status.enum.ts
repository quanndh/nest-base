import { registerEnumType } from "@nestjs/graphql";

export enum TierRequestStatusEnum {
  WAITING = "WAITING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  END = "END",
}

registerEnumType(TierRequestStatusEnum, {
  name: "TierRequestStatusEnum",
});
