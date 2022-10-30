export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
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
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Vegetarian", value: "vegetarian" },
          { title: "Vegan", value: "vegan" },
          { title: "Other", value: "other" },
        ],
      },
    },
    {
      name: "allergens",
      title: "Allergens",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        list: [
          { title: "Gluten", value: "gluten" },
          { title: "Crustaceans", value: "crustaceans" },
          { title: "Eggs", value: "eggs" },
          { title: "Fish", value: "fish" },
          { title: "Peanuts", value: "peanuts" },
          { title: "Soybean", value: "soybean" },
          { title: "Milk", value: "milk" },
          { title: "Nuts", value: "nuts" },
          { title: "Celery", value: "celery" },
          { title: "Mustard", value: "mustard" },
          { title: "Sulphites", value: "sulphites" },
          { title: "Sesame seeds", value: "sesame_seeds" },
          { title: "Lupin", value: "lupin" },
          { title: "Molluscs", value: "molluscs" },
        ],
      },
    },
    {
      name: "shopsWithProduct",
      title: "Shops With Product",
      type: "array",
      of: [
        {
          type: "document",
          name: "productInShop",
          title: "Product In Shop",
          fields: [
            {
              name: "shop",
              title: "Shop",
              type: "reference",
              to: { type: "shop" },
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
            {
              name: "stockCount",
              title: "Stock Count",
              type: "number",
            },
          ],
          preview: {
            select: {
              title: "shop.name",
              price: "price",
              stockCount: "stockCount",
            },
            prepare: ({ title, price, stockCount }) => {
              return {
                title,
                subtitle: `Price: ${price}; Stock Count: ${stockCount}`,
              };
            },
          },
        },
      ],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" },
        },
      ],
    },
    {
      title: "Weight in grams",
      name: "weight",
      type: "number",
    },
    {
      name: "brand",
      title: "Brand",
      type: "reference",
      to: { type: "brand" },
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "brand.name",
      image: "image",
    },
  },
};
