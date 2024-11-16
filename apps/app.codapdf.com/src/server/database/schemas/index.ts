import * as apiKeys from "@/server/database/schemas/apiKeys";
import * as authentications from "@/server/database/schemas/authentications";
import * as licenses from "@/server/database/schemas/licenses";
import * as subscriptions from "@/server/database/schemas/subscriptions";
import * as templates from "@/server/database/schemas/templates";
import * as users from "@/server/database/schemas/users";
import * as apiMetrics from "@/server/database/schemas/apiMetrics";
const schemas = {
  ...licenses,
  ...authentications,
  ...users,
  ...templates,
  ...subscriptions,
  ...apiKeys,
  ...apiMetrics,
};

export { schemas };
