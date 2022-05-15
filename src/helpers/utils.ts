import { CheckRefsExistArgs } from "../types/utils";

export const checkRefsExist = (
  refsToCheck: CheckRefsExistArgs<HTMLDivElement | null>
) => refsToCheck.every((ref) => !!ref.current);
