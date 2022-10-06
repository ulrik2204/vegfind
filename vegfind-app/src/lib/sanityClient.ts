import SanityClient from "@sanity/client";
const sanityClient = SanityClient({
  projectId: "uurn0ezb",
  dataset: "production",
  apiVersion: "2022-10-06", // use current UTC date - see "specifying API version"!
  useCdn: false, // `false` if you want to ensure fresh data
});
export default sanityClient;
