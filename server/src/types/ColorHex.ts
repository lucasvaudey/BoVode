import { GraphQLScalarType, Kind } from "graphql";

export const ColorHex = new GraphQLScalarType({
  name: "ColorHex",
  description: "Hexadecimal Color",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseValue(value: any) {
    if (value.match(/^#[A-F0-9]{6}$/i) === null) {
      return;
    }
    return value;
  },
  parseLiteral(value) {
    if (value.kind != Kind.STRING) {
      return null;
    }
    if (value.value.match(/^#[a-f0-9]{6}$/i) === null) {
      return null;
    }
    return value;
  },
});
