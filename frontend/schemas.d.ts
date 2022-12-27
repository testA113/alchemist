import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  SingleTypeSchema,
  DynamicZoneAttribute,
  ComponentAttribute,
  MediaAttribute,
  RichTextAttribute,
  DateAttribute,
  BigIntegerAttribute,
  UIDAttribute,
  TextAttribute,
  ComponentSchema,
} from "@strapi/strapi";

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: "Permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<"admin::permission", "manyToOne", "admin::role">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: "User";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<"admin::user", "manyToMany", "admin::role"> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: "Role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<"admin::role", "manyToMany", "admin::user">;
    permissions: RelationAttribute<
      "admin::role",
      "oneToMany",
      "admin::permission"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: "Api Token";
    singularName: "api-token";
    pluralName: "api-tokens";
    displayName: "Api Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<"">;
    type: EnumerationAttribute<["read-only", "full-access"]> &
      DefaultTo<"read-only">;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: "file";
    pluralName: "files";
    displayName: "File";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<"plugin::upload.file", "morphToMany">;
    folder: RelationAttribute<
      "plugin::upload.file",
      "manyToOne",
      "plugin::upload.folder"
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: "folder";
    pluralName: "folders";
    displayName: "Folder";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      "plugin::upload.folder",
      "manyToOne",
      "plugin::upload.folder"
    >;
    children: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.folder"
    >;
    files: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.file"
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: "locale";
    pluralName: "locales";
    collectionName: "locales";
    displayName: "Locale";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: "permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      "plugin::users-permissions.permission",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: "role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.permission"
    >;
    users: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.user"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: "user";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      "plugin::users-permissions.user",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiAboutUsAboutUs extends SingleTypeSchema {
  info: {
    singularName: "about-us";
    pluralName: "about-uses";
    displayName: "About Us";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    sections: DynamicZoneAttribute<
      [
        "sections.contact-form",
        "sections.cyclingsentence",
        "sections.event-partners",
        "sections.full-size-carousel",
        "sections.large-summary",
        "sections.services-showcase",
        "sections.showcases",
        "sections.simple-content",
        "sections.video-hero",
        "sections.image-title"
      ]
    > &
      RequiredAttribute;
    seo: ComponentAttribute<"shared.seo"> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::about-us.about-us",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::about-us.about-us",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiBrandActionBrandAction extends SingleTypeSchema {
  info: {
    singularName: "brand-action";
    pluralName: "brand-actions";
    displayName: "Brand Action";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    sections: DynamicZoneAttribute<
      [
        "sections.contact-form",
        "sections.cyclingsentence",
        "sections.event-partners",
        "sections.full-size-carousel",
        "sections.large-summary",
        "sections.services-showcase",
        "sections.showcases",
        "sections.simple-content",
        "sections.video-hero",
        "sections.image-title"
      ]
    > &
      RequiredAttribute;
    seo: ComponentAttribute<"shared.seo"> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::brand-action.brand-action",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::brand-action.brand-action",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiClientClient extends CollectionTypeSchema {
  info: {
    singularName: "client";
    pluralName: "clients";
    displayName: "client";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    image: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::client.client",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::client.client",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiContactContact extends SingleTypeSchema {
  info: {
    singularName: "contact";
    pluralName: "contacts";
    displayName: "contact";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: ComponentAttribute<"shared.seo"> & RequiredAttribute;
    contactSections: DynamicZoneAttribute<
      [
        "sections.contact-form",
        "sections.cyclingsentence",
        "sections.event-partners",
        "sections.full-size-carousel",
        "sections.image-title",
        "sections.large-summary",
        "sections.services-showcase",
        "sections.showcases",
        "sections.simple-content",
        "sections.video-hero"
      ]
    > &
      RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::contact.contact",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::contact.contact",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiContactMessageContactMessage extends CollectionTypeSchema {
  info: {
    singularName: "contact-message";
    pluralName: "contact-messages";
    displayName: "contact message";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 150;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
        maxLength: 200;
      }>;
    description: RichTextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 10;
        maxLength: 4000;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::contact-message.contact-message",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::contact-message.contact-message",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiEventEvent extends CollectionTypeSchema {
  info: {
    singularName: "event";
    pluralName: "events";
    displayName: "event";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    startdate: DateAttribute & RequiredAttribute;
    enddate: DateAttribute;
    logo: MediaAttribute;
    url: StringAttribute;
    numberofattendees: BigIntegerAttribute;
    services: RelationAttribute<
      "api::event.event",
      "manyToMany",
      "api::service.service"
    >;
    drinksserved: BigIntegerAttribute;
    hide: BooleanAttribute & RequiredAttribute & DefaultTo<false>;
    client: RelationAttribute<
      "api::event.event",
      "oneToOne",
      "api::client.client"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::event.event",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::event.event",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiFestivalBarsFestivalBars extends SingleTypeSchema {
  info: {
    singularName: "festival-bars";
    pluralName: "festival-barss";
    displayName: "Festival Bars";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    sections: DynamicZoneAttribute<
      [
        "sections.contact-form",
        "sections.cyclingsentence",
        "sections.event-partners",
        "sections.full-size-carousel",
        "sections.large-summary",
        "sections.services-showcase",
        "sections.showcases",
        "sections.simple-content",
        "sections.video-hero",
        "sections.image-title"
      ]
    > &
      RequiredAttribute;
    seo: ComponentAttribute<"shared.seo"> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::festival-bars.festival-bars",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::festival-bars.festival-bars",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiFooterFooter extends SingleTypeSchema {
  info: {
    singularName: "footer";
    pluralName: "footers";
    displayName: "footer";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    footer: ComponentAttribute<"layout.footer"> & RequiredAttribute;
    socials: ComponentAttribute<"elements.socials"> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::footer.footer",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::footer.footer",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiHomeHome extends SingleTypeSchema {
  info: {
    singularName: "home";
    pluralName: "homes";
    displayName: "home";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: ComponentAttribute<"shared.seo"> & RequiredAttribute;
    homesections: DynamicZoneAttribute<
      [
        "sections.contact-form",
        "sections.cyclingsentence",
        "sections.full-size-carousel",
        "sections.large-summary",
        "sections.services-showcase",
        "sections.video-hero",
        "sections.showcases",
        "sections.event-partners",
        "sections.image-title",
        "sections.simple-content"
      ]
    > &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::home.home", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"api::home.home", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface ApiMenuMenu extends SingleTypeSchema {
  info: {
    singularName: "menu";
    pluralName: "menus";
    displayName: "navbar";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    navbar: ComponentAttribute<"layout.navbar"> & RequiredAttribute;
    social: ComponentAttribute<"elements.socials"> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::menu.menu", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"api::menu.menu", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface ApiPrivateEventsPrivateEvents extends SingleTypeSchema {
  info: {
    singularName: "private-events";
    pluralName: "private-eventss";
    displayName: "Private Events";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    sections: DynamicZoneAttribute<
      [
        "sections.contact-form",
        "sections.cyclingsentence",
        "sections.event-partners",
        "sections.full-size-carousel",
        "sections.large-summary",
        "sections.services-showcase",
        "sections.showcases",
        "sections.simple-content",
        "sections.video-hero",
        "sections.image-title"
      ]
    > &
      RequiredAttribute;
    seo: ComponentAttribute<"shared.seo"> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::private-events.private-events",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::private-events.private-events",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiServiceService extends CollectionTypeSchema {
  info: {
    singularName: "service";
    pluralName: "services";
    displayName: "service";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    slug: UIDAttribute<"api::service.service", "name">;
    showcases: RelationAttribute<
      "api::service.service",
      "manyToMany",
      "api::showcase.showcase"
    >;
    events: RelationAttribute<
      "api::service.service",
      "manyToMany",
      "api::event.event"
    >;
    seo: ComponentAttribute<"shared.seo">;
    fullDescription: RichTextAttribute;
    image: MediaAttribute & RequiredAttribute;
    shortDescription: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 400;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::service.service",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::service.service",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiShowcaseShowcase extends CollectionTypeSchema {
  info: {
    singularName: "showcase";
    pluralName: "showcases";
    displayName: "showcase";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 60;
      }>;
    summary: TextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 155;
      }>;
    hero: MediaAttribute & RequiredAttribute;
    content: RichTextAttribute & RequiredAttribute;
    slug: UIDAttribute<"api::showcase.showcase", "name">;
    client: RelationAttribute<
      "api::showcase.showcase",
      "oneToOne",
      "api::client.client"
    >;
    name: StringAttribute & RequiredAttribute;
    services: RelationAttribute<
      "api::showcase.showcase",
      "manyToMany",
      "api::service.service"
    >;
    event: RelationAttribute<
      "api::showcase.showcase",
      "oneToOne",
      "api::event.event"
    >;
    seo: ComponentAttribute<"shared.seo">;
    featured: BooleanAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::showcase.showcase",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::showcase.showcase",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ElementsFootersection extends ComponentSchema {
  info: {
    name: "footersection";
    displayName: "Footer section";
    icon: "chevron-circle-down";
  };
  attributes: {
    title: StringAttribute;
    links: ComponentAttribute<"links.link", true>;
  };
}

export interface ElementsMobileMenuItem extends ComponentSchema {
  info: {
    displayName: "mobile menu item";
    icon: "minus";
  };
  attributes: {
    label: StringAttribute;
    urlpath: StringAttribute;
  };
}

export interface ElementsSocials extends ComponentSchema {
  info: {
    displayName: "social icons";
    icon: "share-alt";
    description: "";
  };
  attributes: {
    facebookurl: StringAttribute & RequiredAttribute;
    instagramurl: StringAttribute & RequiredAttribute;
    email: EmailAttribute;
    telephone: StringAttribute;
  };
}

export interface ElementsSwipeOption extends ComponentSchema {
  info: {
    displayName: "swipe option";
    icon: "ellipsis-h";
  };
  attributes: {
    option: StringAttribute;
  };
}

export interface LayoutFooter extends ComponentSchema {
  info: {
    name: "Footer";
    displayName: "Footer";
    icon: "caret-square-down";
    description: "";
  };
  attributes: {
    logo: MediaAttribute;
    creditslink: ComponentAttribute<"links.link">;
  };
}

export interface LayoutNavbar extends ComponentSchema {
  info: {
    name: "Navbar";
    displayName: "Navbar";
    icon: "map-signs";
    description: "";
  };
  attributes: {
    links: ComponentAttribute<"links.link", true> &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    logo: MediaAttribute & RequiredAttribute;
    actionButton: ComponentAttribute<"links.link"> & RequiredAttribute;
  };
}

export interface LinksButton extends ComponentSchema {
  info: {
    displayName: "button";
    icon: "caret-square-right";
    description: "";
  };
  attributes: {
    mode: EnumerationAttribute<
      ["primary", "secondary", "default", "warning", "danger", "link"]
    > &
      DefaultTo<"default">;
    size: EnumerationAttribute<["xs", "sm", "md", "lg"]>;
    text: StringAttribute;
    icon: EnumerationAttribute<
      [
        "Accessibility",
        "Activity",
        "AirVent",
        "Airplay",
        "AlarmCheck",
        "AlarmClock",
        "AlarmClockOff",
        "AlarmMinus",
        "AlarmPlus",
        "Album",
        "AlertCircle",
        "AlertOctagon",
        "AlertTriangle",
        "AlignCenter",
        "AlignCenterHorizontal",
        "AlignCenterVertical",
        "AlignEndHorizontal",
        "AlignEndVertical",
        "AlignHorizontalDistributeCenter",
        "AlignHorizontalDistributeEnd",
        "AlignHorizontalDistributeStart",
        "AlignHorizontalJustifyCenter",
        "AlignHorizontalJustifyEnd",
        "AlignHorizontalJustifyStart",
        "AlignHorizontalSpaceAround",
        "AlignHorizontalSpaceBetween",
        "AlignJustify",
        "AlignLeft",
        "AlignRight",
        "AlignStartHorizontal",
        "AlignStartVertical",
        "AlignVerticalDistributeCenter",
        "AlignVerticalDistributeEnd",
        "AlignVerticalDistributeStart",
        "AlignVerticalJustifyCenter",
        "AlignVerticalJustifyEnd",
        "AlignVerticalJustifyStart",
        "AlignVerticalSpaceAround",
        "AlignVerticalSpaceBetween",
        "Anchor",
        "Angry",
        "Annoyed",
        "Aperture",
        "Apple",
        "Archive",
        "ArchiveRestore",
        "Armchair",
        "ArrowBigDown",
        "ArrowBigLeft",
        "ArrowBigRight",
        "ArrowBigUp",
        "ArrowDown",
        "ArrowDownCircle",
        "ArrowDownLeft",
        "ArrowDownRight",
        "ArrowLeft",
        "ArrowLeftCircle",
        "ArrowLeftRight",
        "ArrowRight",
        "ArrowRightCircle",
        "ArrowUp",
        "ArrowUpCircle",
        "ArrowUpDown",
        "ArrowUpLeft",
        "ArrowUpRight",
        "Asterisk",
        "AtSign",
        "Award",
        "Axe",
        "Axis3d",
        "Baby",
        "Backpack",
        "BaggageClaim",
        "Banana",
        "Banknote",
        "BarChart",
        "BarChart2",
        "BarChart3",
        "BarChart4",
        "BarChartHorizontal",
        "Baseline",
        "Bath",
        "Battery",
        "BatteryCharging",
        "BatteryFull",
        "BatteryLow",
        "BatteryMedium",
        "Beaker",
        "Bed",
        "BedDouble",
        "BedSingle",
        "Beer",
        "Bell",
        "BellMinus",
        "BellOff",
        "BellPlus",
        "BellRing",
        "Bike",
        "Binary",
        "Bitcoin",
        "Bluetooth",
        "BluetoothConnected",
        "BluetoothOff",
        "BluetoothSearching",
        "Bold",
        "Bomb",
        "Bone",
        "Book",
        "BookOpen",
        "BookOpenCheck",
        "Bookmark",
        "BookmarkMinus",
        "BookmarkPlus",
        "Bot",
        "Box",
        "BoxSelect",
        "Boxes",
        "Briefcase",
        "Brush",
        "Bug",
        "Building",
        "Building2",
        "Bus",
        "Cake",
        "Calculator",
        "Calendar",
        "CalendarCheck",
        "CalendarCheck2",
        "CalendarClock",
        "CalendarDays",
        "CalendarHeart",
        "CalendarMinus",
        "CalendarOff",
        "CalendarPlus",
        "CalendarRange",
        "CalendarSearch",
        "CalendarX",
        "CalendarX2",
        "Camera",
        "CameraOff",
        "Car",
        "Carrot",
        "Cast",
        "Check",
        "CheckCircle",
        "CheckCircle2",
        "CheckSquare",
        "ChefHat",
        "Cherry",
        "ChevronDown",
        "ChevronFirst",
        "ChevronLast",
        "ChevronLeft",
        "ChevronRight",
        "ChevronUp",
        "ChevronsDown",
        "ChevronsDownUp",
        "ChevronsLeft",
        "ChevronsLeftRight",
        "ChevronsRight",
        "ChevronsRightLeft",
        "ChevronsUp",
        "ChevronsUpDown",
        "Chrome",
        "Cigarette",
        "CigaretteOff",
        "Circle",
        "CircleDot",
        "CircleEllipsis",
        "CircleSlashed",
        "Citrus",
        "Clapperboard",
        "Clipboard",
        "ClipboardCheck",
        "ClipboardCopy",
        "ClipboardEdit",
        "ClipboardList",
        "ClipboardSignature",
        "ClipboardType",
        "ClipboardX",
        "Clock",
        "Clock1",
        "Clock10",
        "Clock11",
        "Clock12",
        "Clock2",
        "Clock3",
        "Clock4",
        "Clock5",
        "Clock6",
        "Clock7",
        "Clock8",
        "Clock9",
        "Cloud",
        "CloudCog",
        "CloudDrizzle",
        "CloudFog",
        "CloudHail",
        "CloudLightning",
        "CloudMoon",
        "CloudMoonRain",
        "CloudOff",
        "CloudRain",
        "CloudRainWind",
        "CloudSnow",
        "CloudSun",
        "CloudSunRain",
        "Cloudy",
        "Clover",
        "Code",
        "Code2",
        "Codepen",
        "Codesandbox",
        "Coffee",
        "Cog",
        "Coins",
        "Columns",
        "Command",
        "Compass",
        "Component",
        "ConciergeBell",
        "Contact",
        "Contrast",
        "Cookie",
        "Copy",
        "Copyleft",
        "Copyright",
        "CornerDownLeft",
        "CornerDownRight",
        "CornerLeftDown",
        "CornerLeftUp",
        "CornerRightDown",
        "CornerRightUp",
        "CornerUpLeft",
        "CornerUpRight",
        "Cpu",
        "CreditCard",
        "Croissant",
        "Crop",
        "Cross",
        "Crosshair",
        "Crown",
        "CupSoda",
        "CurlyBraces",
        "Currency",
        "Database",
        "Delete",
        "Diamond",
        "Dice1",
        "Dice2",
        "Dice3",
        "Dice4",
        "Dice5",
        "Dice6",
        "Dices",
        "Diff",
        "Disc",
        "Divide",
        "DivideCircle",
        "DivideSquare",
        "DollarSign",
        "Download",
        "DownloadCloud",
        "Dribbble",
        "Droplet",
        "Droplets",
        "Drumstick",
        "Ear",
        "EarOff",
        "Edit",
        "Edit2",
        "Edit3",
        "Egg",
        "EggFried",
        "Equal",
        "EqualNot",
        "Eraser",
        "Euro",
        "Expand",
        "ExternalLink",
        "Eye",
        "EyeOff",
        "Facebook",
        "Factory",
        "Fan",
        "FastForward",
        "Feather",
        "Figma",
        "File",
        "FileArchive",
        "FileAudio",
        "FileAudio2",
        "FileAxis3d",
        "FileBadge",
        "FileBadge2",
        "FileBarChart",
        "FileBarChart2",
        "FileBox",
        "FileCheck",
        "FileCheck2",
        "FileClock",
        "FileCode",
        "FileCog",
        "FileCog2",
        "FileDiff",
        "FileDigit",
        "FileDown",
        "FileEdit",
        "FileHeart",
        "FileImage",
        "FileInput",
        "FileJson",
        "FileJson2",
        "FileKey",
        "FileKey2",
        "FileLineChart",
        "FileLock",
        "FileLock2",
        "FileMinus",
        "FileMinus2",
        "FileOutput",
        "FilePieChart",
        "FilePlus",
        "FilePlus2",
        "FileQuestion",
        "FileScan",
        "FileSearch",
        "FileSearch2",
        "FileSignature",
        "FileSpreadsheet",
        "FileSymlink",
        "FileTerminal",
        "FileText",
        "FileType",
        "FileType2",
        "FileUp",
        "FileVideo",
        "FileVideo2",
        "FileVolume",
        "FileVolume2",
        "FileWarning",
        "FileX",
        "FileX2",
        "Files",
        "Film",
        "Filter",
        "Fingerprint",
        "Flag",
        "FlagOff",
        "FlagTriangleLeft",
        "FlagTriangleRight",
        "Flame",
        "Flashlight",
        "FlashlightOff",
        "FlaskConical",
        "FlaskRound",
        "FlipHorizontal",
        "FlipHorizontal2",
        "FlipVertical",
        "FlipVertical2",
        "Flower",
        "Flower2",
        "Focus",
        "Folder",
        "FolderArchive",
        "FolderCheck",
        "FolderClock",
        "FolderClosed",
        "FolderCog",
        "FolderCog2",
        "FolderDown",
        "FolderEdit",
        "FolderHeart",
        "FolderInput",
        "FolderKey",
        "FolderLock",
        "FolderMinus",
        "FolderOpen",
        "FolderOutput",
        "FolderPlus",
        "FolderSearch",
        "FolderSearch2",
        "FolderSymlink",
        "FolderTree",
        "FolderUp",
        "FolderX",
        "Folders",
        "FormInput",
        "Forward",
        "Frame",
        "Framer",
        "Frown",
        "Fuel",
        "FunctionSquare",
        "Gamepad",
        "Gamepad2",
        "Gauge",
        "Gavel",
        "Gem",
        "Ghost",
        "Gift",
        "GitBranch",
        "GitBranchPlus",
        "GitCommit",
        "GitCompare",
        "GitFork",
        "GitMerge",
        "GitPullRequest",
        "GitPullRequestClosed",
        "GitPullRequestDraft",
        "Github",
        "Gitlab",
        "GlassWater",
        "Glasses",
        "Globe",
        "Globe2",
        "Grab",
        "GraduationCap",
        "Grape",
        "Grid",
        "GripHorizontal",
        "GripVertical",
        "Hammer",
        "Hand",
        "HandMetal",
        "HardDrive",
        "HardHat",
        "Hash",
        "Haze",
        "Headphones",
        "Heart",
        "HeartCrack",
        "HeartHandshake",
        "HeartOff",
        "HeartPulse",
        "HelpCircle",
        "Hexagon",
        "Highlighter",
        "History",
        "Home",
        "Hourglass",
        "IceCream",
        "Image",
        "ImageMinus",
        "ImageOff",
        "ImagePlus",
        "Import",
        "Inbox",
        "Indent",
        "IndianRupee",
        "Infinity",
        "Info",
        "Inspect",
        "Instagram",
        "Italic",
        "JapaneseYen",
        "Joystick",
        "Key",
        "Keyboard",
        "Lamp",
        "LampCeiling",
        "LampDesk",
        "LampFloor",
        "LampWallDown",
        "LampWallUp",
        "Landmark",
        "Languages",
        "Laptop",
        "Laptop2",
        "Lasso",
        "LassoSelect",
        "Laugh",
        "Layers",
        "Layout",
        "LayoutDashboard",
        "LayoutGrid",
        "LayoutList",
        "LayoutTemplate",
        "Leaf",
        "Library",
        "LifeBuoy",
        "Lightbulb",
        "LightbulbOff",
        "LineChart",
        "Link",
        "Link2",
        "Link2Off",
        "Linkedin",
        "List",
        "ListChecks",
        "ListEnd",
        "ListMinus",
        "ListMusic",
        "ListOrdered",
        "ListPlus",
        "ListStart",
        "ListVideo",
        "ListX",
        "Loader",
        "Loader2",
        "Locate",
        "LocateFixed",
        "LocateOff",
        "Lock",
        "LogIn",
        "LogOut",
        "Luggage",
        "Magnet",
        "Mail",
        "MailCheck",
        "MailMinus",
        "MailOpen",
        "MailPlus",
        "MailQuestion",
        "MailSearch",
        "MailWarning",
        "MailX",
        "Mails",
        "Map",
        "MapPin",
        "MapPinOff",
        "Martini",
        "Maximize",
        "Maximize2",
        "Medal",
        "Megaphone",
        "MegaphoneOff",
        "Meh",
        "Menu",
        "MessageCircle",
        "MessageSquare",
        "Mic",
        "Mic2",
        "MicOff",
        "Microscope",
        "Microwave",
        "Milestone",
        "Minimize",
        "Minimize2",
        "Minus",
        "MinusCircle",
        "MinusSquare",
        "Monitor",
        "MonitorOff",
        "MonitorSpeaker",
        "Moon",
        "MoreHorizontal",
        "MoreVertical",
        "Mountain",
        "MountainSnow",
        "Mouse",
        "MousePointer",
        "MousePointer2",
        "MousePointerClick",
        "Move",
        "Move3d",
        "MoveDiagonal",
        "MoveDiagonal2",
        "MoveHorizontal",
        "MoveVertical",
        "Music",
        "Music2",
        "Music3",
        "Music4",
        "Navigation",
        "Navigation2",
        "Navigation2Off",
        "NavigationOff",
        "Network",
        "Newspaper",
        "Octagon",
        "Option",
        "Outdent",
        "Package",
        "Package2",
        "PackageCheck",
        "PackageMinus",
        "PackageOpen",
        "PackagePlus",
        "PackageSearch",
        "PackageX",
        "PaintBucket",
        "Paintbrush",
        "Paintbrush2",
        "Palette",
        "Palmtree",
        "Paperclip",
        "PartyPopper",
        "Pause",
        "PauseCircle",
        "PauseOctagon",
        "PenTool",
        "Pencil",
        "Percent",
        "PersonStanding",
        "Phone",
        "PhoneCall",
        "PhoneForwarded",
        "PhoneIncoming",
        "PhoneMissed",
        "PhoneOff",
        "PhoneOutgoing",
        "PieChart",
        "PiggyBank",
        "Pin",
        "PinOff",
        "Pipette",
        "Pizza",
        "Plane",
        "Play",
        "PlayCircle",
        "Plug",
        "Plug2",
        "PlugZap",
        "Plus",
        "PlusCircle",
        "PlusSquare",
        "Pocket",
        "Podcast",
        "Pointer",
        "PoundSterling",
        "Power",
        "PowerOff",
        "Printer",
        "Puzzle",
        "QrCode",
        "Quote",
        "Radio",
        "RadioReceiver",
        "RectangleHorizontal",
        "RectangleVertical",
        "Recycle",
        "Redo",
        "Redo2",
        "RefreshCcw",
        "RefreshCw",
        "Refrigerator",
        "Regex",
        "Repeat",
        "Repeat1",
        "Reply",
        "ReplyAll",
        "Rewind",
        "Rocket",
        "RockingChair",
        "Rotate3d",
        "RotateCcw",
        "RotateCw",
        "Rss",
        "Ruler",
        "RussianRuble",
        "Sailboat",
        "Save",
        "Scale",
        "Scale3d",
        "Scaling",
        "Scan",
        "ScanFace",
        "ScanLine",
        "Scissors",
        "ScreenShare",
        "ScreenShareOff",
        "Scroll",
        "Search",
        "Send",
        "SeparatorHorizontal",
        "SeparatorVertical",
        "Server",
        "ServerCog",
        "ServerCrash",
        "ServerOff",
        "Settings",
        "Settings2",
        "Share",
        "Share2",
        "Sheet",
        "Shield",
        "ShieldAlert",
        "ShieldCheck",
        "ShieldClose",
        "ShieldOff",
        "Shirt",
        "ShoppingBag",
        "ShoppingCart",
        "Shovel",
        "ShowerHead",
        "Shrink",
        "Shrub",
        "Shuffle",
        "Sidebar",
        "SidebarClose",
        "SidebarOpen",
        "Sigma",
        "Signal",
        "SignalHigh",
        "SignalLow",
        "SignalMedium",
        "SignalZero",
        "Siren",
        "SkipBack",
        "SkipForward",
        "Skull",
        "Slack",
        "Slash",
        "Slice",
        "Sliders",
        "SlidersHorizontal",
        "Smartphone",
        "SmartphoneCharging",
        "Smile",
        "SmilePlus",
        "Snowflake",
        "Sofa",
        "SortAsc",
        "SortDesc",
        "Speaker",
        "Sprout",
        "Square",
        "Star",
        "StarHalf",
        "StarOff",
        "Stethoscope",
        "Sticker",
        "StickyNote",
        "StopCircle",
        "StretchHorizontal",
        "StretchVertical",
        "Strikethrough",
        "Subscript",
        "Sun",
        "SunDim",
        "SunMedium",
        "SunMoon",
        "SunSnow",
        "Sunrise",
        "Sunset",
        "Superscript",
        "SwissFranc",
        "SwitchCamera",
        "Sword",
        "Swords",
        "Syringe",
        "Table",
        "Table2",
        "Tablet",
        "Tag",
        "Tags",
        "Target",
        "Tent",
        "Terminal",
        "TerminalSquare",
        "TextCursor",
        "TextCursorInput",
        "Thermometer",
        "ThermometerSnowflake",
        "ThermometerSun",
        "ThumbsDown",
        "ThumbsUp",
        "Ticket",
        "Timer",
        "TimerOff",
        "TimerReset",
        "ToggleLeft",
        "ToggleRight",
        "Tornado",
        "ToyBrick",
        "Train",
        "Trash",
        "Trash2",
        "TreeDeciduous",
        "TreePine",
        "Trees",
        "Trello",
        "TrendingDown",
        "TrendingUp",
        "Triangle",
        "Trophy",
        "Truck",
        "Tv",
        "Tv2",
        "Twitch",
        "Twitter",
        "Type",
        "Umbrella",
        "Underline",
        "Undo",
        "Undo2",
        "Unlink",
        "Unlink2",
        "Unlock",
        "Upload",
        "UploadCloud",
        "Usb",
        "User",
        "UserCheck",
        "UserCog",
        "UserMinus",
        "UserPlus",
        "UserX",
        "Users",
        "Utensils",
        "UtensilsCrossed",
        "VenetianMask",
        "Verified",
        "Vibrate",
        "VibrateOff",
        "Video",
        "VideoOff",
        "View",
        "Voicemail",
        "Volume",
        "Volume1",
        "Volume2",
        "VolumeX",
        "Wallet",
        "Wand",
        "Wand2",
        "Watch",
        "Waves",
        "Webcam",
        "Webhook",
        "Wifi",
        "WifiOff",
        "Wind",
        "Wine",
        "WrapText",
        "Wrench",
        "X",
        "XCircle",
        "XOctagon",
        "XSquare",
        "Youtube",
        "Zap",
        "ZapOff",
        "ZoomIn",
        "ZoomOut",
        "createReactComponent"
      ]
    >;
    type: EnumerationAttribute<["submit", "button"]> & DefaultTo<"button">;
    loadingText: StringAttribute;
  };
}

export interface LinksLink extends ComponentSchema {
  info: {
    name: "link";
    displayName: "link";
    icon: "link";
    description: "";
  };
  attributes: {
    to: StringAttribute & RequiredAttribute;
    newTab: BooleanAttribute & DefaultTo<false>;
    text: StringAttribute;
    size: EnumerationAttribute<["xs", "sm", "md", "lg"]>;
    mode: EnumerationAttribute<
      ["primary", "secondary", "default", "warning", "danger", "link"]
    > &
      RequiredAttribute &
      DefaultTo<"link">;
    icon: EnumerationAttribute<
      [
        "Accessibility",
        "Activity",
        "AirVent",
        "Airplay",
        "AlarmCheck",
        "AlarmClock",
        "AlarmClockOff",
        "AlarmMinus",
        "AlarmPlus",
        "Album",
        "AlertCircle",
        "AlertOctagon",
        "AlertTriangle",
        "AlignCenter",
        "AlignCenterHorizontal",
        "AlignCenterVertical",
        "AlignEndHorizontal",
        "AlignEndVertical",
        "AlignHorizontalDistributeCenter",
        "AlignHorizontalDistributeEnd",
        "AlignHorizontalDistributeStart",
        "AlignHorizontalJustifyCenter",
        "AlignHorizontalJustifyEnd",
        "AlignHorizontalJustifyStart",
        "AlignHorizontalSpaceAround",
        "AlignHorizontalSpaceBetween",
        "AlignJustify",
        "AlignLeft",
        "AlignRight",
        "AlignStartHorizontal",
        "AlignStartVertical",
        "AlignVerticalDistributeCenter",
        "AlignVerticalDistributeEnd",
        "AlignVerticalDistributeStart",
        "AlignVerticalJustifyCenter",
        "AlignVerticalJustifyEnd",
        "AlignVerticalJustifyStart",
        "AlignVerticalSpaceAround",
        "AlignVerticalSpaceBetween",
        "Anchor",
        "Angry",
        "Annoyed",
        "Aperture",
        "Apple",
        "Archive",
        "ArchiveRestore",
        "Armchair",
        "ArrowBigDown",
        "ArrowBigLeft",
        "ArrowBigRight",
        "ArrowBigUp",
        "ArrowDown",
        "ArrowDownCircle",
        "ArrowDownLeft",
        "ArrowDownRight",
        "ArrowLeft",
        "ArrowLeftCircle",
        "ArrowLeftRight",
        "ArrowRight",
        "ArrowRightCircle",
        "ArrowUp",
        "ArrowUpCircle",
        "ArrowUpDown",
        "ArrowUpLeft",
        "ArrowUpRight",
        "Asterisk",
        "AtSign",
        "Award",
        "Axe",
        "Axis3d",
        "Baby",
        "Backpack",
        "BaggageClaim",
        "Banana",
        "Banknote",
        "BarChart",
        "BarChart2",
        "BarChart3",
        "BarChart4",
        "BarChartHorizontal",
        "Baseline",
        "Bath",
        "Battery",
        "BatteryCharging",
        "BatteryFull",
        "BatteryLow",
        "BatteryMedium",
        "Beaker",
        "Bed",
        "BedDouble",
        "BedSingle",
        "Beer",
        "Bell",
        "BellMinus",
        "BellOff",
        "BellPlus",
        "BellRing",
        "Bike",
        "Binary",
        "Bitcoin",
        "Bluetooth",
        "BluetoothConnected",
        "BluetoothOff",
        "BluetoothSearching",
        "Bold",
        "Bomb",
        "Bone",
        "Book",
        "BookOpen",
        "BookOpenCheck",
        "Bookmark",
        "BookmarkMinus",
        "BookmarkPlus",
        "Bot",
        "Box",
        "BoxSelect",
        "Boxes",
        "Briefcase",
        "Brush",
        "Bug",
        "Building",
        "Building2",
        "Bus",
        "Cake",
        "Calculator",
        "Calendar",
        "CalendarCheck",
        "CalendarCheck2",
        "CalendarClock",
        "CalendarDays",
        "CalendarHeart",
        "CalendarMinus",
        "CalendarOff",
        "CalendarPlus",
        "CalendarRange",
        "CalendarSearch",
        "CalendarX",
        "CalendarX2",
        "Camera",
        "CameraOff",
        "Car",
        "Carrot",
        "Cast",
        "Check",
        "CheckCircle",
        "CheckCircle2",
        "CheckSquare",
        "ChefHat",
        "Cherry",
        "ChevronDown",
        "ChevronFirst",
        "ChevronLast",
        "ChevronLeft",
        "ChevronRight",
        "ChevronUp",
        "ChevronsDown",
        "ChevronsDownUp",
        "ChevronsLeft",
        "ChevronsLeftRight",
        "ChevronsRight",
        "ChevronsRightLeft",
        "ChevronsUp",
        "ChevronsUpDown",
        "Chrome",
        "Cigarette",
        "CigaretteOff",
        "Circle",
        "CircleDot",
        "CircleEllipsis",
        "CircleSlashed",
        "Citrus",
        "Clapperboard",
        "Clipboard",
        "ClipboardCheck",
        "ClipboardCopy",
        "ClipboardEdit",
        "ClipboardList",
        "ClipboardSignature",
        "ClipboardType",
        "ClipboardX",
        "Clock",
        "Clock1",
        "Clock10",
        "Clock11",
        "Clock12",
        "Clock2",
        "Clock3",
        "Clock4",
        "Clock5",
        "Clock6",
        "Clock7",
        "Clock8",
        "Clock9",
        "Cloud",
        "CloudCog",
        "CloudDrizzle",
        "CloudFog",
        "CloudHail",
        "CloudLightning",
        "CloudMoon",
        "CloudMoonRain",
        "CloudOff",
        "CloudRain",
        "CloudRainWind",
        "CloudSnow",
        "CloudSun",
        "CloudSunRain",
        "Cloudy",
        "Clover",
        "Code",
        "Code2",
        "Codepen",
        "Codesandbox",
        "Coffee",
        "Cog",
        "Coins",
        "Columns",
        "Command",
        "Compass",
        "Component",
        "ConciergeBell",
        "Contact",
        "Contrast",
        "Cookie",
        "Copy",
        "Copyleft",
        "Copyright",
        "CornerDownLeft",
        "CornerDownRight",
        "CornerLeftDown",
        "CornerLeftUp",
        "CornerRightDown",
        "CornerRightUp",
        "CornerUpLeft",
        "CornerUpRight",
        "Cpu",
        "CreditCard",
        "Croissant",
        "Crop",
        "Cross",
        "Crosshair",
        "Crown",
        "CupSoda",
        "CurlyBraces",
        "Currency",
        "Database",
        "Delete",
        "Diamond",
        "Dice1",
        "Dice2",
        "Dice3",
        "Dice4",
        "Dice5",
        "Dice6",
        "Dices",
        "Diff",
        "Disc",
        "Divide",
        "DivideCircle",
        "DivideSquare",
        "DollarSign",
        "Download",
        "DownloadCloud",
        "Dribbble",
        "Droplet",
        "Droplets",
        "Drumstick",
        "Ear",
        "EarOff",
        "Edit",
        "Edit2",
        "Edit3",
        "Egg",
        "EggFried",
        "Equal",
        "EqualNot",
        "Eraser",
        "Euro",
        "Expand",
        "ExternalLink",
        "Eye",
        "EyeOff",
        "Facebook",
        "Factory",
        "Fan",
        "FastForward",
        "Feather",
        "Figma",
        "File",
        "FileArchive",
        "FileAudio",
        "FileAudio2",
        "FileAxis3d",
        "FileBadge",
        "FileBadge2",
        "FileBarChart",
        "FileBarChart2",
        "FileBox",
        "FileCheck",
        "FileCheck2",
        "FileClock",
        "FileCode",
        "FileCog",
        "FileCog2",
        "FileDiff",
        "FileDigit",
        "FileDown",
        "FileEdit",
        "FileHeart",
        "FileImage",
        "FileInput",
        "FileJson",
        "FileJson2",
        "FileKey",
        "FileKey2",
        "FileLineChart",
        "FileLock",
        "FileLock2",
        "FileMinus",
        "FileMinus2",
        "FileOutput",
        "FilePieChart",
        "FilePlus",
        "FilePlus2",
        "FileQuestion",
        "FileScan",
        "FileSearch",
        "FileSearch2",
        "FileSignature",
        "FileSpreadsheet",
        "FileSymlink",
        "FileTerminal",
        "FileText",
        "FileType",
        "FileType2",
        "FileUp",
        "FileVideo",
        "FileVideo2",
        "FileVolume",
        "FileVolume2",
        "FileWarning",
        "FileX",
        "FileX2",
        "Files",
        "Film",
        "Filter",
        "Fingerprint",
        "Flag",
        "FlagOff",
        "FlagTriangleLeft",
        "FlagTriangleRight",
        "Flame",
        "Flashlight",
        "FlashlightOff",
        "FlaskConical",
        "FlaskRound",
        "FlipHorizontal",
        "FlipHorizontal2",
        "FlipVertical",
        "FlipVertical2",
        "Flower",
        "Flower2",
        "Focus",
        "Folder",
        "FolderArchive",
        "FolderCheck",
        "FolderClock",
        "FolderClosed",
        "FolderCog",
        "FolderCog2",
        "FolderDown",
        "FolderEdit",
        "FolderHeart",
        "FolderInput",
        "FolderKey",
        "FolderLock",
        "FolderMinus",
        "FolderOpen",
        "FolderOutput",
        "FolderPlus",
        "FolderSearch",
        "FolderSearch2",
        "FolderSymlink",
        "FolderTree",
        "FolderUp",
        "FolderX",
        "Folders",
        "FormInput",
        "Forward",
        "Frame",
        "Framer",
        "Frown",
        "Fuel",
        "FunctionSquare",
        "Gamepad",
        "Gamepad2",
        "Gauge",
        "Gavel",
        "Gem",
        "Ghost",
        "Gift",
        "GitBranch",
        "GitBranchPlus",
        "GitCommit",
        "GitCompare",
        "GitFork",
        "GitMerge",
        "GitPullRequest",
        "GitPullRequestClosed",
        "GitPullRequestDraft",
        "Github",
        "Gitlab",
        "GlassWater",
        "Glasses",
        "Globe",
        "Globe2",
        "Grab",
        "GraduationCap",
        "Grape",
        "Grid",
        "GripHorizontal",
        "GripVertical",
        "Hammer",
        "Hand",
        "HandMetal",
        "HardDrive",
        "HardHat",
        "Hash",
        "Haze",
        "Headphones",
        "Heart",
        "HeartCrack",
        "HeartHandshake",
        "HeartOff",
        "HeartPulse",
        "HelpCircle",
        "Hexagon",
        "Highlighter",
        "History",
        "Home",
        "Hourglass",
        "IceCream",
        "Image",
        "ImageMinus",
        "ImageOff",
        "ImagePlus",
        "Import",
        "Inbox",
        "Indent",
        "IndianRupee",
        "Infinity",
        "Info",
        "Inspect",
        "Instagram",
        "Italic",
        "JapaneseYen",
        "Joystick",
        "Key",
        "Keyboard",
        "Lamp",
        "LampCeiling",
        "LampDesk",
        "LampFloor",
        "LampWallDown",
        "LampWallUp",
        "Landmark",
        "Languages",
        "Laptop",
        "Laptop2",
        "Lasso",
        "LassoSelect",
        "Laugh",
        "Layers",
        "Layout",
        "LayoutDashboard",
        "LayoutGrid",
        "LayoutList",
        "LayoutTemplate",
        "Leaf",
        "Library",
        "LifeBuoy",
        "Lightbulb",
        "LightbulbOff",
        "LineChart",
        "Link",
        "Link2",
        "Link2Off",
        "Linkedin",
        "List",
        "ListChecks",
        "ListEnd",
        "ListMinus",
        "ListMusic",
        "ListOrdered",
        "ListPlus",
        "ListStart",
        "ListVideo",
        "ListX",
        "Loader",
        "Loader2",
        "Locate",
        "LocateFixed",
        "LocateOff",
        "Lock",
        "LogIn",
        "LogOut",
        "Luggage",
        "Magnet",
        "Mail",
        "MailCheck",
        "MailMinus",
        "MailOpen",
        "MailPlus",
        "MailQuestion",
        "MailSearch",
        "MailWarning",
        "MailX",
        "Mails",
        "Map",
        "MapPin",
        "MapPinOff",
        "Martini",
        "Maximize",
        "Maximize2",
        "Medal",
        "Megaphone",
        "MegaphoneOff",
        "Meh",
        "Menu",
        "MessageCircle",
        "MessageSquare",
        "Mic",
        "Mic2",
        "MicOff",
        "Microscope",
        "Microwave",
        "Milestone",
        "Minimize",
        "Minimize2",
        "Minus",
        "MinusCircle",
        "MinusSquare",
        "Monitor",
        "MonitorOff",
        "MonitorSpeaker",
        "Moon",
        "MoreHorizontal",
        "MoreVertical",
        "Mountain",
        "MountainSnow",
        "Mouse",
        "MousePointer",
        "MousePointer2",
        "MousePointerClick",
        "Move",
        "Move3d",
        "MoveDiagonal",
        "MoveDiagonal2",
        "MoveHorizontal",
        "MoveVertical",
        "Music",
        "Music2",
        "Music3",
        "Music4",
        "Navigation",
        "Navigation2",
        "Navigation2Off",
        "NavigationOff",
        "Network",
        "Newspaper",
        "Octagon",
        "Option",
        "Outdent",
        "Package",
        "Package2",
        "PackageCheck",
        "PackageMinus",
        "PackageOpen",
        "PackagePlus",
        "PackageSearch",
        "PackageX",
        "PaintBucket",
        "Paintbrush",
        "Paintbrush2",
        "Palette",
        "Palmtree",
        "Paperclip",
        "PartyPopper",
        "Pause",
        "PauseCircle",
        "PauseOctagon",
        "PenTool",
        "Pencil",
        "Percent",
        "PersonStanding",
        "Phone",
        "PhoneCall",
        "PhoneForwarded",
        "PhoneIncoming",
        "PhoneMissed",
        "PhoneOff",
        "PhoneOutgoing",
        "PieChart",
        "PiggyBank",
        "Pin",
        "PinOff",
        "Pipette",
        "Pizza",
        "Plane",
        "Play",
        "PlayCircle",
        "Plug",
        "Plug2",
        "PlugZap",
        "Plus",
        "PlusCircle",
        "PlusSquare",
        "Pocket",
        "Podcast",
        "Pointer",
        "PoundSterling",
        "Power",
        "PowerOff",
        "Printer",
        "Puzzle",
        "QrCode",
        "Quote",
        "Radio",
        "RadioReceiver",
        "RectangleHorizontal",
        "RectangleVertical",
        "Recycle",
        "Redo",
        "Redo2",
        "RefreshCcw",
        "RefreshCw",
        "Refrigerator",
        "Regex",
        "Repeat",
        "Repeat1",
        "Reply",
        "ReplyAll",
        "Rewind",
        "Rocket",
        "RockingChair",
        "Rotate3d",
        "RotateCcw",
        "RotateCw",
        "Rss",
        "Ruler",
        "RussianRuble",
        "Sailboat",
        "Save",
        "Scale",
        "Scale3d",
        "Scaling",
        "Scan",
        "ScanFace",
        "ScanLine",
        "Scissors",
        "ScreenShare",
        "ScreenShareOff",
        "Scroll",
        "Search",
        "Send",
        "SeparatorHorizontal",
        "SeparatorVertical",
        "Server",
        "ServerCog",
        "ServerCrash",
        "ServerOff",
        "Settings",
        "Settings2",
        "Share",
        "Share2",
        "Sheet",
        "Shield",
        "ShieldAlert",
        "ShieldCheck",
        "ShieldClose",
        "ShieldOff",
        "Shirt",
        "ShoppingBag",
        "ShoppingCart",
        "Shovel",
        "ShowerHead",
        "Shrink",
        "Shrub",
        "Shuffle",
        "Sidebar",
        "SidebarClose",
        "SidebarOpen",
        "Sigma",
        "Signal",
        "SignalHigh",
        "SignalLow",
        "SignalMedium",
        "SignalZero",
        "Siren",
        "SkipBack",
        "SkipForward",
        "Skull",
        "Slack",
        "Slash",
        "Slice",
        "Sliders",
        "SlidersHorizontal",
        "Smartphone",
        "SmartphoneCharging",
        "Smile",
        "SmilePlus",
        "Snowflake",
        "Sofa",
        "SortAsc",
        "SortDesc",
        "Speaker",
        "Sprout",
        "Square",
        "Star",
        "StarHalf",
        "StarOff",
        "Stethoscope",
        "Sticker",
        "StickyNote",
        "StopCircle",
        "StretchHorizontal",
        "StretchVertical",
        "Strikethrough",
        "Subscript",
        "Sun",
        "SunDim",
        "SunMedium",
        "SunMoon",
        "SunSnow",
        "Sunrise",
        "Sunset",
        "Superscript",
        "SwissFranc",
        "SwitchCamera",
        "Sword",
        "Swords",
        "Syringe",
        "Table",
        "Table2",
        "Tablet",
        "Tag",
        "Tags",
        "Target",
        "Tent",
        "Terminal",
        "TerminalSquare",
        "TextCursor",
        "TextCursorInput",
        "Thermometer",
        "ThermometerSnowflake",
        "ThermometerSun",
        "ThumbsDown",
        "ThumbsUp",
        "Ticket",
        "Timer",
        "TimerOff",
        "TimerReset",
        "ToggleLeft",
        "ToggleRight",
        "Tornado",
        "ToyBrick",
        "Train",
        "Trash",
        "Trash2",
        "TreeDeciduous",
        "TreePine",
        "Trees",
        "Trello",
        "TrendingDown",
        "TrendingUp",
        "Triangle",
        "Trophy",
        "Truck",
        "Tv",
        "Tv2",
        "Twitch",
        "Twitter",
        "Type",
        "Umbrella",
        "Underline",
        "Undo",
        "Undo2",
        "Unlink",
        "Unlink2",
        "Unlock",
        "Upload",
        "UploadCloud",
        "Usb",
        "User",
        "UserCheck",
        "UserCog",
        "UserMinus",
        "UserPlus",
        "UserX",
        "Users",
        "Utensils",
        "UtensilsCrossed",
        "VenetianMask",
        "Verified",
        "Vibrate",
        "VibrateOff",
        "Video",
        "VideoOff",
        "View",
        "Voicemail",
        "Volume",
        "Volume1",
        "Volume2",
        "VolumeX",
        "Wallet",
        "Wand",
        "Wand2",
        "Watch",
        "Waves",
        "Webcam",
        "Webhook",
        "Wifi",
        "WifiOff",
        "Wind",
        "Wine",
        "WrapText",
        "Wrench",
        "X",
        "XCircle",
        "XOctagon",
        "XSquare",
        "Youtube",
        "Zap",
        "ZapOff",
        "ZoomIn",
        "ZoomOut",
        "createReactComponent"
      ]
    >;
  };
}

export interface SectionsContactForm extends ComponentSchema {
  info: {
    displayName: "contact form";
    icon: "address-card";
    description: "";
  };
  attributes: {
    namelabel: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<"Hi, my name is">;
    nameplaceholder: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<"slim shady">;
    descriptionlabel: StringAttribute &
      RequiredAttribute &
      DefaultTo<"I'm looking for">;
    descriptionplaceholder: StringAttribute;
    emaillabel: StringAttribute &
      RequiredAttribute &
      DefaultTo<"You can reach me at">;
    emailplaceholder: StringAttribute;
    showcaptcha: BooleanAttribute & RequiredAttribute & DefaultTo<true>;
    submitbutton: ComponentAttribute<"links.button"> & RequiredAttribute;
    titleContent: RichTextAttribute & RequiredAttribute;
  };
}

export interface SectionsCyclingsentence extends ComponentSchema {
  info: {
    name: "cyclingsentence";
    displayName: "cycling sentence";
    icon: "align-center";
    description: "";
  };
  attributes: {
    sentencestart: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    sentenceendings: JSONAttribute & RequiredAttribute;
  };
}

export interface SectionsEventPartners extends ComponentSchema {
  info: {
    displayName: "event partners";
    icon: "smile-beam";
    description: "";
  };
  attributes: {
    partnerImage: MediaAttribute & RequiredAttribute;
    titleContent: RichTextAttribute & RequiredAttribute;
  };
}

export interface SectionsFullSizeCarousel extends ComponentSchema {
  info: {
    displayName: "full size carousel";
    icon: "images";
    description: "";
  };
  attributes: {
    images: MediaAttribute & RequiredAttribute;
  };
}

export interface SectionsImageTitle extends ComponentSchema {
  info: {
    displayName: "Image Title";
    icon: "ad";
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    image: MediaAttribute;
  };
}

export interface SectionsLargeSummary extends ComponentSchema {
  info: {
    displayName: "large summary";
    icon: "align-center";
    description: "";
  };
  attributes: {
    summarytext: RichTextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<"we are the best bitches in all the land">;
    backgroundimage: MediaAttribute;
    moreInfoLink: ComponentAttribute<"links.link">;
  };
}

export interface SectionsServicesShowcase extends ComponentSchema {
  info: {
    displayName: "services";
    icon: "address-card";
    description: "";
  };
  attributes: {
    services: RelationAttribute<
      "sections.services-showcase",
      "oneToMany",
      "api::service.service"
    >;
    titleContent: RichTextAttribute & RequiredAttribute;
  };
}

export interface SectionsShowcases extends ComponentSchema {
  info: {
    displayName: "showcases";
    icon: "id-badge";
    description: "";
  };
  attributes: {
    showcases: RelationAttribute<
      "sections.showcases",
      "oneToMany",
      "api::showcase.showcase"
    >;
    seeMoreButton: ComponentAttribute<"links.link"> & RequiredAttribute;
    titleContent: RichTextAttribute & RequiredAttribute;
  };
}

export interface SectionsSimpleContent extends ComponentSchema {
  info: {
    displayName: "simpleContent";
    icon: "align-center";
    description: "";
  };
  attributes: {
    content: RichTextAttribute & RequiredAttribute;
  };
}

export interface SectionsVideoHero extends ComponentSchema {
  info: {
    displayName: "video hero";
    icon: "video";
    description: "";
  };
  attributes: {
    videoUrl: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    cyclingSentence: ComponentAttribute<"sections.cyclingsentence"> &
      RequiredAttribute;
    showScroll: BooleanAttribute;
    secondaryButton: ComponentAttribute<"links.button">;
    link: ComponentAttribute<"links.button">;
    videoName: StringAttribute;
    loadingBackgroundImage: MediaAttribute & RequiredAttribute;
    fallbackImage: MediaAttribute & RequiredAttribute;
    primaryButton: ComponentAttribute<"links.link">;
  };
}

export interface SharedMetaSocial extends ComponentSchema {
  info: {
    displayName: "metaSocial";
    icon: "project-diagram";
    description: "";
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: MediaAttribute;
  };
}

export interface SharedSeo extends ComponentSchema {
  info: {
    displayName: "seo";
    icon: "search";
    description: "";
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    image: MediaAttribute & RequiredAttribute;
    keywords: TextAttribute;
    robots: StringAttribute;
    structuredData: JSONAttribute;
    viewport: StringAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      "admin::permission": AdminPermission;
      "admin::user": AdminUser;
      "admin::role": AdminRole;
      "admin::api-token": AdminApiToken;
      "plugin::upload.file": PluginUploadFile;
      "plugin::upload.folder": PluginUploadFolder;
      "plugin::i18n.locale": PluginI18NLocale;
      "plugin::users-permissions.permission": PluginUsersPermissionsPermission;
      "plugin::users-permissions.role": PluginUsersPermissionsRole;
      "plugin::users-permissions.user": PluginUsersPermissionsUser;
      "api::about-us.about-us": ApiAboutUsAboutUs;
      "api::brand-action.brand-action": ApiBrandActionBrandAction;
      "api::client.client": ApiClientClient;
      "api::contact.contact": ApiContactContact;
      "api::contact-message.contact-message": ApiContactMessageContactMessage;
      "api::event.event": ApiEventEvent;
      "api::festival-bars.festival-bars": ApiFestivalBarsFestivalBars;
      "api::footer.footer": ApiFooterFooter;
      "api::home.home": ApiHomeHome;
      "api::menu.menu": ApiMenuMenu;
      "api::private-events.private-events": ApiPrivateEventsPrivateEvents;
      "api::service.service": ApiServiceService;
      "api::showcase.showcase": ApiShowcaseShowcase;
      "elements.footersection": ElementsFootersection;
      "elements.mobile-menu-item": ElementsMobileMenuItem;
      "elements.socials": ElementsSocials;
      "elements.swipe-option": ElementsSwipeOption;
      "layout.footer": LayoutFooter;
      "layout.navbar": LayoutNavbar;
      "links.button": LinksButton;
      "links.link": LinksLink;
      "sections.contact-form": SectionsContactForm;
      "sections.cyclingsentence": SectionsCyclingsentence;
      "sections.event-partners": SectionsEventPartners;
      "sections.full-size-carousel": SectionsFullSizeCarousel;
      "sections.image-title": SectionsImageTitle;
      "sections.large-summary": SectionsLargeSummary;
      "sections.services-showcase": SectionsServicesShowcase;
      "sections.showcases": SectionsShowcases;
      "sections.simple-content": SectionsSimpleContent;
      "sections.video-hero": SectionsVideoHero;
      "shared.meta-social": SharedMetaSocial;
      "shared.seo": SharedSeo;
    }
  }
}
