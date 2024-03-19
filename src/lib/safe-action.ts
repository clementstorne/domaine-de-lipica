import { getServerSession } from "next-auth";
import { createSafeActionClient } from "next-safe-action";
import { authOptions } from "./auth";

export const action = createSafeActionClient();

export class ActionError extends Error {}

export const authenticatedAction = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }
    return "Une erreur est survenue";
  },
  async middleware() {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Vous devez être connecté pour effectuer cette action");
    }
  },
});
