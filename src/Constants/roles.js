export const CREATE = "Add";
export const UPDATE = "Edit";

export const SUPER_ADMIN = "SUPER_ADMIN";
export const ADMIN = "ADMIN";
export const MERCHANT = "MERCHANT";
export const CUSTOMER = "CUSTOMER";

export const LINKS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "RestaurantMenu",
    roles: [SUPER_ADMIN, ADMIN],
    show: {
      header: false,
      drawer: true
    }
  },
  {
    label: "Restaurants",
    href: "/restaurants",
    icon: "RestaurantMenu",
    roles: [SUPER_ADMIN, ADMIN],
    show: {
      header: false,
      drawer: true
    }
  },
  {
    label: "Items",
    href: "/items",
    icon: "/Fastfood",
    roles: [SUPER_ADMIN, MERCHANT],
    show: {
      header: false,
      drawer: true
    }
  },
  {
    label: "Orders",
    href: "/orders",
    roles: [SUPER_ADMIN, MERCHANT],
    show: {
      header: false,
      drawer: true
    }
  },
  {
    label: "Tables",
    href: "/tables",
    roles: [SUPER_ADMIN, MERCHANT],
    show: {
      header: false,
      drawer: true
    }
  }
];