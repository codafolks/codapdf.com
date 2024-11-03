import * as apiKeys from "@/server/database/schemas/apiKeys";
import * as licenses from "@/server/database/schemas/licenses";
import * as subscriptions from "@/server/database/schemas/subscriptions";
import * as templates from "@/server/database/schemas/templates";
import * as users from "@/server/database/schemas/users";
import * as authentications from "@/server/database/schemas/authentications";
const schemas = {
  ...licenses,
  ...authentications,
  ...users,
  ...templates,
  ...subscriptions,
  ...apiKeys,
};

export { schemas };
