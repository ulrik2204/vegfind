export default {
  name: "shop",
  title: "Shop",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Big", value: "big" },
          { title: "Huge", value: "huge" },
        ],
      },
    },
    {
      name: "supermarketChain",
      title: "Supermarket Chain",
      type: "reference",
      to: { type: "supermarketChain" },
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "postalCode",
      title: "Postal Code",
      type: "number",
    },
    {
      name: "mapsLink",
      title: "Maps Link",
      type: "url",
      description: "A Google Maps link to the location of the store.",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "supermarketChain.name",
    },
  },
};
