import { resolveTag, type TagRef } from "../../lib/tags";
import { CustomerTag } from "./CustomerTag";
import { ProjectTag } from "./ProjectTag";

type TagProps = {
  ref: TagRef;
};

export function Tag({ ref }: TagProps) {
  const resolved = resolveTag(ref);
  if (!resolved) return null;
  if (resolved.kind === "customer") {
    return <CustomerTag company={resolved.label} />;
  }
  return <ProjectTag name={resolved.label} />;
}
