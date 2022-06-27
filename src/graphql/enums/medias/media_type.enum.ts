import { registerEnumType } from "@nestjs/graphql";

export enum MediaTypeEnum {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  FILE = "FILE",
}

registerEnumType(MediaTypeEnum, {
  name: "MediaTypeEnum",
});
