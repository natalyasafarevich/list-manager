export interface FlagProps {
  flags: {svg: string};
  name: {
    localeCompare(name: {common: string}): unknown;
    common: string;
  };
}
