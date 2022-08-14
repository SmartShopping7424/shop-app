export default ({ config }) => {
  let name = "";
  let slug = "";
  let description = "";
  let owner = "smart_shopping";

  // if stage is prod
  if (process.env.EXPO_STAGE == "prod") {
    name = "Shopkeeper App Prod";
    slug = "shop-app-prod";
    description = "prod version of shopkeeper application";
  }

  // else stage is dev
  else {
    name = "Shopkeeper App Dev";
    slug = "shop-app-dev";
    description = "dev version of shopkeeper application";
  }

  // return value
  return {
    ...config,
    name: name,
    slug: slug,
    owner: owner,
    description: description,
  };
};
