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
  MediaAttribute,
  RichTextAttribute,
  DateAttribute,
  BigIntegerAttribute,
  SingleTypeSchema,
  ComponentAttribute,
  DynamicZoneAttribute,
  UIDAttribute,
  TextAttribute,
  ComponentSchema,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
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
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
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
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
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
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
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
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access']> &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
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
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
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
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
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
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
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
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
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
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
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
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiClientClient extends CollectionTypeSchema {
  info: {
    singularName: 'client';
    pluralName: 'clients';
    displayName: 'client';
    description: '';
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
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiContactMessageContactMessage extends CollectionTypeSchema {
  info: {
    singularName: 'contact-message';
    pluralName: 'contact-messages';
    displayName: 'contact message';
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
    body: RichTextAttribute;
    services: RelationAttribute<
      'api::contact-message.contact-message',
      'oneToMany',
      'api::service.service'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::contact-message.contact-message',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::contact-message.contact-message',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiEventEvent extends CollectionTypeSchema {
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'event';
    description: '';
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
      'api::event.event',
      'manyToMany',
      'api::service.service'
    >;
    drinksserved: BigIntegerAttribute;
    hide: BooleanAttribute & RequiredAttribute & DefaultTo<false>;
    client: RelationAttribute<
      'api::event.event',
      'oneToOne',
      'api::client.client'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiFooterFooter extends SingleTypeSchema {
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'footer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    footer: ComponentAttribute<'layout.footer'> & RequiredAttribute;
    socials: ComponentAttribute<'elements.socials'> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiHomeHome extends SingleTypeSchema {
  info: {
    singularName: 'home';
    pluralName: 'homes';
    displayName: 'home';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: ComponentAttribute<'shared.seo'>;
    homesections: DynamicZoneAttribute<
      [
        'sections.contact-form',
        'sections.cyclingsentence',
        'sections.full-size-carousel',
        'sections.large-summary',
        'sections.services-showcase',
        'sections.video-hero',
        'sections.multi-round-image-view'
      ]
    > &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::home.home', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::home.home', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiMenuMenu extends SingleTypeSchema {
  info: {
    singularName: 'menu';
    pluralName: 'menus';
    displayName: 'navbar';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    navbar: ComponentAttribute<'layout.navbar'> & RequiredAttribute;
    social: ComponentAttribute<'elements.socials'> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::menu.menu', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::menu.menu', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiServiceService extends CollectionTypeSchema {
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'service';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    slug: UIDAttribute<'api::service.service', 'name'>;
    showcases: RelationAttribute<
      'api::service.service',
      'manyToMany',
      'api::showcase.showcase'
    >;
    events: RelationAttribute<
      'api::service.service',
      'manyToMany',
      'api::event.event'
    >;
    seo: ComponentAttribute<'shared.seo'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiShowcaseShowcase extends CollectionTypeSchema {
  info: {
    singularName: 'showcase';
    pluralName: 'showcases';
    displayName: 'showcase';
    description: '';
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
    slug: UIDAttribute<'api::showcase.showcase', 'name'>;
    client: RelationAttribute<
      'api::showcase.showcase',
      'oneToOne',
      'api::client.client'
    >;
    name: StringAttribute & RequiredAttribute;
    services: RelationAttribute<
      'api::showcase.showcase',
      'manyToMany',
      'api::service.service'
    >;
    event: RelationAttribute<
      'api::showcase.showcase',
      'oneToOne',
      'api::event.event'
    >;
    seo: ComponentAttribute<'shared.seo'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::showcase.showcase',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::showcase.showcase',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ElementsFootersection extends ComponentSchema {
  info: {
    name: 'footersection';
    displayName: 'Footer section';
    icon: 'chevron-circle-down';
  };
  attributes: {
    title: StringAttribute;
    links: ComponentAttribute<'links.link', true>;
  };
}

export interface ElementsMobileMenuItem extends ComponentSchema {
  info: {
    displayName: 'mobile menu item';
    icon: 'minus';
  };
  attributes: {
    label: StringAttribute;
    urlpath: StringAttribute;
  };
}

export interface ElementsSocials extends ComponentSchema {
  info: {
    displayName: 'social icons';
    icon: 'share-alt';
    description: '';
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
    displayName: 'swipe option';
    icon: 'ellipsis-h';
  };
  attributes: {
    option: StringAttribute;
  };
}

export interface LayoutFooter extends ComponentSchema {
  info: {
    name: 'Footer';
    displayName: 'Footer';
    icon: 'caret-square-down';
    description: '';
  };
  attributes: {
    logo: MediaAttribute;
    sitemaplinks: ComponentAttribute<'links.link', true> &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    creditslink: ComponentAttribute<'links.link'>;
  };
}

export interface LayoutNavbar extends ComponentSchema {
  info: {
    name: 'Navbar';
    displayName: 'Navbar';
    icon: 'map-signs';
    description: '';
  };
  attributes: {
    links: ComponentAttribute<'links.link', true> &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    actionButton: ComponentAttribute<'links.button'>;
    logo: MediaAttribute & RequiredAttribute;
  };
}

export interface LinksButton extends ComponentSchema {
  info: {
    displayName: 'button';
    icon: 'caret-square-right';
    description: '';
  };
  attributes: {
    type: EnumerationAttribute<
      ['primary', 'secondary', 'default', 'warning', 'danger']
    > &
      DefaultTo<'default'>;
    size: EnumerationAttribute<['xs', 'sm', 'md', 'lg']>;
    text: StringAttribute;
    url: StringAttribute;
    newTab: BooleanAttribute & DefaultTo<false>;
    function: StringAttribute;
    icon: EnumerationAttribute<
      [
        'accessibility',
        'activity',
        'air-vent',
        'airplay',
        'alarm-check',
        'alarm-clock-off',
        'alarm-clock',
        'alarm-minus',
        'alarm-plus',
        'album',
        'alert-circle',
        'alert-octagon',
        'alert-triangle',
        'align-center-horizontal',
        'align-center-vertical',
        'align-center',
        'align-end-horizontal',
        'align-end-vertical',
        'align-horizontal-distribute-center',
        'align-horizontal-distribute-end',
        'align-horizontal-distribute-start',
        'align-horizontal-justify-center',
        'align-horizontal-justify-end',
        'align-horizontal-justify-start',
        'align-horizontal-space-around',
        'align-horizontal-space-between',
        'align-justify',
        'align-left',
        'align-right',
        'align-start-horizontal',
        'align-start-vertical',
        'align-vertical-distribute-center',
        'align-vertical-distribute-end',
        'align-vertical-distribute-start',
        'align-vertical-justify-center',
        'align-vertical-justify-end',
        'align-vertical-justify-start',
        'align-vertical-space-around',
        'align-vertical-space-between',
        'anchor',
        'angry',
        'annoyed',
        'aperture',
        'apple',
        'archive-restore',
        'archive',
        'armchair',
        'arrow-big-down',
        'arrow-big-left',
        'arrow-big-right',
        'arrow-big-up',
        'arrow-down-circle',
        'arrow-down-left',
        'arrow-down-right',
        'arrow-down',
        'arrow-left-circle',
        'arrow-left-right',
        'arrow-left',
        'arrow-right-circle',
        'arrow-right',
        'arrow-up-circle',
        'arrow-up-down',
        'arrow-up-left',
        'arrow-up-right',
        'arrow-up',
        'asterisk',
        'at-sign',
        'award',
        'axe',
        'axis-3d',
        'baby',
        'backpack',
        'baggage-claim',
        'banana',
        'banknote',
        'bar-chart-2',
        'bar-chart-3',
        'bar-chart-4',
        'bar-chart-horizontal',
        'bar-chart',
        'baseline',
        'bath',
        'battery-charging',
        'battery-full',
        'battery-low',
        'battery-medium',
        'battery',
        'beaker',
        'bed-double',
        'bed-single',
        'bed',
        'beer',
        'bell-minus',
        'bell-off',
        'bell-plus',
        'bell-ring',
        'bell',
        'bike',
        'binary',
        'bitcoin',
        'bluetooth-connected',
        'bluetooth-off',
        'bluetooth-searching',
        'bluetooth',
        'bold',
        'bomb',
        'bone',
        'book-open-check',
        'book-open',
        'book',
        'bookmark-minus',
        'bookmark-plus',
        'bookmark',
        'bot',
        'box-select',
        'box',
        'boxes',
        'briefcase',
        'brush',
        'bug',
        'building-2',
        'building',
        'bus',
        'cake',
        'calculator',
        'calendar-check-2',
        'calendar-check',
        'calendar-clock',
        'calendar-days',
        'calendar-heart',
        'calendar-minus',
        'calendar-off',
        'calendar-plus',
        'calendar-range',
        'calendar-search',
        'calendar-x-2',
        'calendar-x',
        'calendar',
        'camera-off',
        'camera',
        'car',
        'carrot',
        'cast',
        'check-circle-2',
        'check-circle',
        'check-square',
        'check',
        'chef-hat',
        'cherry',
        'chevron-down',
        'chevron-first',
        'chevron-last',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'chevrons-down-up',
        'chevrons-down',
        'chevrons-left-right',
        'chevrons-left',
        'chevrons-right-left',
        'chevrons-right',
        'chevrons-up-down',
        'chevrons-up',
        'chrome',
        'cigarette-off',
        'cigarette',
        'circle-dot',
        'circle-ellipsis',
        'circle-slashed',
        'circle',
        'citrus',
        'clapperboard',
        'clipboard-check',
        'clipboard-copy',
        'clipboard-edit',
        'clipboard-list',
        'clipboard-signature',
        'clipboard-type',
        'clipboard-x',
        'clipboard',
        'clock-1',
        'clock-10',
        'clock-11',
        'clock-12',
        'clock-2',
        'clock-3',
        'clock-4',
        'clock-5',
        'clock-6',
        'clock-7',
        'clock-8',
        'clock-9',
        'clock',
        'cloud-cog',
        'cloud-drizzle',
        'cloud-fog',
        'cloud-hail',
        'cloud-lightning',
        'cloud-moon-rain',
        'cloud-moon',
        'cloud-off',
        'cloud-rain-wind',
        'cloud-rain',
        'cloud-snow',
        'cloud-sun-rain',
        'cloud-sun',
        'cloud',
        'cloudy',
        'clover',
        'code-2',
        'code',
        'codepen',
        'codesandbox',
        'coffee',
        'cog',
        'coins',
        'columns',
        'command',
        'compass',
        'component',
        'concierge-bell',
        'contact',
        'contrast',
        'cookie',
        'copy',
        'copyleft',
        'copyright',
        'corner-down-left',
        'corner-down-right',
        'corner-left-down',
        'corner-left-up',
        'corner-right-down',
        'corner-right-up',
        'corner-up-left',
        'corner-up-right',
        'cpu',
        'credit-card',
        'croissant',
        'crop',
        'cross',
        'crosshair',
        'crown',
        'cup-soda',
        'curly-braces',
        'currency',
        'database',
        'delete',
        'diamond',
        'dice-1',
        'dice-2',
        'dice-3',
        'dice-4',
        'dice-5',
        'dice-6',
        'dices',
        'diff',
        'disc',
        'divide-circle',
        'divide-square',
        'divide',
        'dollar-sign',
        'download-cloud',
        'download',
        'dribbble',
        'droplet',
        'droplets',
        'drumstick',
        'ear-off',
        'ear',
        'edit-2',
        'edit-3',
        'edit',
        'egg-fried',
        'egg',
        'equal-not',
        'equal',
        'eraser',
        'euro',
        'expand',
        'external-link',
        'eye-off',
        'eye',
        'facebook',
        'factory',
        'fan',
        'fast-forward',
        'feather',
        'figma',
        'file-archive',
        'file-audio-2',
        'file-audio',
        'file-axis-3d',
        'file-badge-2',
        'file-badge',
        'file-bar-chart-2',
        'file-bar-chart',
        'file-box',
        'file-check-2',
        'file-check',
        'file-clock',
        'file-code',
        'file-cog-2',
        'file-cog',
        'file-diff',
        'file-digit',
        'file-down',
        'file-edit',
        'file-heart',
        'file-image',
        'file-input',
        'file-json-2',
        'file-json',
        'file-key-2',
        'file-key',
        'file-line-chart',
        'file-lock-2',
        'file-lock',
        'file-minus-2',
        'file-minus',
        'file-output',
        'file-pie-chart',
        'file-plus-2',
        'file-plus',
        'file-question',
        'file-scan',
        'file-search-2',
        'file-search',
        'file-signature',
        'file-spreadsheet',
        'file-symlink',
        'file-terminal',
        'file-text',
        'file-type-2',
        'file-type',
        'file-up',
        'file-video-2',
        'file-video',
        'file-volume-2',
        'file-volume',
        'file-warning',
        'file-x-2',
        'file-x',
        'file',
        'files',
        'film',
        'filter',
        'fingerprint',
        'flag-off',
        'flag-triangle-left',
        'flag-triangle-right',
        'flag',
        'flame',
        'flashlight-off',
        'flashlight',
        'flask-conical',
        'flask-round',
        'flip-horizontal-2',
        'flip-horizontal',
        'flip-vertical-2',
        'flip-vertical',
        'flower-2',
        'flower',
        'focus',
        'folder-archive',
        'folder-check',
        'folder-clock',
        'folder-closed',
        'folder-cog-2',
        'folder-cog',
        'folder-down',
        'folder-edit',
        'folder-heart',
        'folder-input',
        'folder-key',
        'folder-lock',
        'folder-minus',
        'folder-open',
        'folder-output',
        'folder-plus',
        'folder-search-2',
        'folder-search',
        'folder-symlink',
        'folder-tree',
        'folder-up',
        'folder-x',
        'folder',
        'folders',
        'form-input',
        'forward',
        'frame',
        'framer',
        'frown',
        'fuel',
        'function-square',
        'gamepad-2',
        'gamepad',
        'gauge',
        'gavel',
        'gem',
        'ghost',
        'gift',
        'git-branch-plus',
        'git-branch',
        'git-commit',
        'git-compare',
        'git-fork',
        'git-merge',
        'git-pull-request-closed',
        'git-pull-request-draft',
        'git-pull-request',
        'github',
        'gitlab',
        'glass-water',
        'glasses',
        'globe-2',
        'globe',
        'grab',
        'graduation-cap',
        'grape',
        'grid',
        'grip-horizontal',
        'grip-vertical',
        'hammer',
        'hand-metal',
        'hand',
        'hard-drive',
        'hard-hat',
        'hash',
        'haze',
        'headphones',
        'heart-crack',
        'heart-handshake',
        'heart-off',
        'heart-pulse',
        'heart',
        'help-circle',
        'hexagon',
        'highlighter',
        'history',
        'home',
        'hourglass',
        'ice-cream',
        'image-minus',
        'image-off',
        'image-plus',
        'image',
        'import',
        'inbox',
        'indent',
        'indian-rupee',
        'infinity',
        'info',
        'inspect',
        'instagram',
        'italic',
        'japanese-yen',
        'joystick',
        'key',
        'keyboard',
        'lamp-ceiling',
        'lamp-desk',
        'lamp-floor',
        'lamp-wall-down',
        'lamp-wall-up',
        'lamp',
        'landmark',
        'languages',
        'laptop-2',
        'laptop',
        'lasso-select',
        'lasso',
        'laugh',
        'layers',
        'layout-dashboard',
        'layout-grid',
        'layout-list',
        'layout-template',
        'layout',
        'leaf',
        'library',
        'life-buoy',
        'lightbulb-off',
        'lightbulb',
        'line-chart',
        'link-2-off',
        'link-2',
        'link',
        'linkedin',
        'list-checks',
        'list-end',
        'list-minus',
        'list-music',
        'list-ordered',
        'list-plus',
        'list-start',
        'list-video',
        'list-x',
        'list',
        'loader-2',
        'loader',
        'locate-fixed',
        'locate-off',
        'locate',
        'lock',
        'log-in',
        'log-out',
        'luggage',
        'magnet',
        'mail-check',
        'mail-minus',
        'mail-open',
        'mail-plus',
        'mail-question',
        'mail-search',
        'mail-warning',
        'mail-x',
        'mail',
        'mails',
        'map-pin-off',
        'map-pin',
        'map',
        'martini',
        'maximize-2',
        'maximize',
        'medal',
        'megaphone-off',
        'megaphone',
        'meh',
        'menu',
        'message-circle',
        'message-square',
        'mic-2',
        'mic-off',
        'mic',
        'microscope',
        'microwave',
        'milestone',
        'minimize-2',
        'minimize',
        'minus-circle',
        'minus-square',
        'minus',
        'monitor-off',
        'monitor-speaker',
        'monitor',
        'moon',
        'more-horizontal',
        'more-vertical',
        'mountain-snow',
        'mountain',
        'mouse-pointer-2',
        'mouse-pointer-click',
        'mouse-pointer',
        'mouse',
        'move-3d',
        'move-diagonal-2',
        'move-diagonal',
        'move-horizontal',
        'move-vertical',
        'move',
        'music-2',
        'music-3',
        'music-4',
        'music',
        'navigation-2-off',
        'navigation-2',
        'navigation-off',
        'navigation',
        'network',
        'newspaper',
        'octagon',
        'option',
        'outdent',
        'package-2',
        'package-check',
        'package-minus',
        'package-open',
        'package-plus',
        'package-search',
        'package-x',
        'package',
        'paint-bucket',
        'paintbrush-2',
        'paintbrush',
        'palette',
        'palmtree',
        'paperclip',
        'party-popper',
        'pause-circle',
        'pause-octagon',
        'pause',
        'pen-tool',
        'pencil',
        'percent',
        'person-standing',
        'phone-call',
        'phone-forwarded',
        'phone-incoming',
        'phone-missed',
        'phone-off',
        'phone-outgoing',
        'phone',
        'pie-chart',
        'piggy-bank',
        'pin-off',
        'pin',
        'pipette',
        'pizza',
        'plane',
        'play-circle',
        'play',
        'plug-2',
        'plug-zap',
        'plug',
        'plus-circle',
        'plus-square',
        'plus',
        'pocket',
        'podcast',
        'pointer',
        'pound-sterling',
        'power-off',
        'power',
        'printer',
        'puzzle',
        'qr-code',
        'quote',
        'radio-receiver',
        'radio',
        'rectangle-horizontal',
        'rectangle-vertical',
        'recycle',
        'redo-2',
        'redo',
        'refresh-ccw',
        'refresh-cw',
        'refrigerator',
        'regex',
        'repeat-1',
        'repeat',
        'reply-all',
        'reply',
        'rewind',
        'rocket',
        'rocking-chair',
        'rotate-3d',
        'rotate-ccw',
        'rotate-cw',
        'rss',
        'ruler',
        'russian-ruble',
        'sailboat',
        'save',
        'scale-3d',
        'scale',
        'scaling',
        'scan-face',
        'scan-line',
        'scan',
        'scissors',
        'screen-share-off',
        'screen-share',
        'scroll',
        'search',
        'send',
        'separator-horizontal',
        'separator-vertical',
        'server-cog',
        'server-crash',
        'server-off',
        'server',
        'settings-2',
        'settings',
        'share-2',
        'share',
        'sheet',
        'shield-alert',
        'shield-check',
        'shield-close',
        'shield-off',
        'shield',
        'shirt',
        'shopping-bag',
        'shopping-cart',
        'shovel',
        'shower-head',
        'shrink',
        'shrub',
        'shuffle',
        'sidebar-close',
        'sidebar-open',
        'sidebar',
        'sigma',
        'signal-high',
        'signal-low',
        'signal-medium',
        'signal-zero',
        'signal',
        'siren',
        'skip-back',
        'skip-forward',
        'skull',
        'slack',
        'slash',
        'slice',
        'sliders-horizontal',
        'sliders',
        'smartphone-charging',
        'smartphone',
        'smile-plus',
        'smile',
        'snowflake',
        'sofa',
        'sort-asc',
        'sort-desc',
        'speaker',
        'sprout',
        'square',
        'star-half',
        'star-off',
        'star',
        'stethoscope',
        'sticker',
        'sticky-note',
        'stop-circle',
        'stretch-horizontal',
        'stretch-vertical',
        'strikethrough',
        'subscript',
        'sun-dim',
        'sun-medium',
        'sun-moon',
        'sun-snow',
        'sun',
        'sunrise',
        'sunset',
        'superscript',
        'swiss-franc',
        'switch-camera',
        'sword',
        'swords',
        'syringe',
        'table-2',
        'table',
        'tablet',
        'tag',
        'tags',
        'target',
        'tent',
        'terminal-square',
        'terminal',
        'text-cursor-input',
        'text-cursor',
        'thermometer-snowflake',
        'thermometer-sun',
        'thermometer',
        'thumbs-down',
        'thumbs-up',
        'ticket',
        'timer-off',
        'timer-reset',
        'timer',
        'toggle-left',
        'toggle-right',
        'tornado',
        'toy-brick',
        'train',
        'trash-2',
        'trash',
        'tree-deciduous',
        'tree-pine',
        'trees',
        'trello',
        'trending-down',
        'trending-up',
        'triangle',
        'trophy',
        'truck',
        'tv-2',
        'tv',
        'twitch',
        'twitter',
        'type',
        'umbrella',
        'underline',
        'undo-2',
        'undo',
        'unlink-2',
        'unlink',
        'unlock',
        'upload-cloud',
        'upload',
        'usb',
        'user-check',
        'user-cog',
        'user-minus',
        'user-plus',
        'user-x',
        'user',
        'users',
        'utensils-crossed',
        'utensils',
        'venetian-mask',
        'verified',
        'vibrate-off',
        'vibrate',
        'video-off',
        'video',
        'view',
        'voicemail',
        'volume-1',
        'volume-2',
        'volume-x',
        'volume',
        'wallet',
        'wand-2',
        'wand',
        'watch',
        'waves',
        'webcam',
        'webhook',
        'wifi-off',
        'wifi',
        'wind',
        'wine',
        'wrap-text',
        'wrench',
        'x-circle',
        'x-octagon',
        'x-square',
        'x',
        'youtube',
        'zap-off',
        'zap',
        'zoom-in',
        'zoom-out'
      ]
    >;
  };
}

export interface LinksLink extends ComponentSchema {
  info: {
    name: 'link';
    displayName: 'link';
    icon: 'link';
    description: '';
  };
  attributes: {
    path: StringAttribute & RequiredAttribute;
    newTab: BooleanAttribute & DefaultTo<false>;
    text: StringAttribute & RequiredAttribute;
    size: EnumerationAttribute<['small', 'medium', 'large', 'extaLarge']>;
    group: StringAttribute;
  };
}

export interface SectionsContactForm extends ComponentSchema {
  info: {
    displayName: 'contact form';
    icon: 'address-card';
    description: '';
  };
  attributes: {
    namelabel: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<'Hi, my name is'>;
    nameplaceholder: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<'slim shady'>;
    descriptionlabel: StringAttribute &
      RequiredAttribute &
      DefaultTo<"I'm looking for">;
    descriptionplaceholder: StringAttribute;
    emaillabel: StringAttribute &
      RequiredAttribute &
      DefaultTo<'You can reach me at'>;
    emailplaceholder: StringAttribute;
    showcaptcha: BooleanAttribute & RequiredAttribute & DefaultTo<true>;
    emailicon: EnumerationAttribute<
      [
        'activity',
        'airplay',
        'alert-circle',
        'alert-octagon',
        'alert-triangle',
        'align-center',
        'align-justify',
        'align-left',
        'align-right',
        'anchor',
        'aperture',
        'archive',
        'arrow-down-circle',
        'arrow-down-left',
        'arrow-down-right',
        'arrow-down',
        'arrow-left-circle',
        'arrow-left',
        'arrow-right-circle',
        'arrow-right',
        'arrow-up-circle',
        'arrow-up-left',
        'arrow-up-right',
        'arrow-up',
        'at-sign',
        'award',
        'bar-chart-2',
        'bar-chart',
        'battery-charging',
        'battery',
        'bell-off',
        'bell',
        'bluetooth',
        'bold',
        'book-open',
        'book',
        'bookmark',
        'box',
        'briefcase',
        'calendar',
        'camera-off',
        'camera',
        'cast',
        'check-circle',
        'check-square',
        'check',
        'chevron-down',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'chevrons-down',
        'chevrons-left',
        'chevrons-right',
        'chevrons-up',
        'chrome',
        'circle',
        'clipboard',
        'clock',
        'cloud-drizzle',
        'cloud-lightning',
        'cloud-off',
        'cloud-rain',
        'cloud-snow',
        'cloud',
        'code',
        'codepen',
        'codesandbox',
        'coffee',
        'columns',
        'command',
        'compass',
        'copy',
        'corner-down-left',
        'corner-down-right',
        'corner-left-down',
        'corner-left-up',
        'corner-right-down',
        'corner-right-up',
        'corner-up-left',
        'corner-up-right',
        'cpu',
        'credit-card',
        'crop',
        'crosshair',
        'database',
        'delete',
        'disc',
        'divide-circle',
        'divide-square',
        'divide',
        'dollar-sign',
        'download-cloud',
        'download',
        'dribbble',
        'droplet',
        'edit-2',
        'edit-3',
        'edit',
        'external-link',
        'eye-off',
        'eye',
        'facebook',
        'fast-forward',
        'feather',
        'figma',
        'file-minus',
        'file-plus',
        'file-text',
        'file',
        'film',
        'filter',
        'flag',
        'folder-minus',
        'folder-plus',
        'folder',
        'framer',
        'frown',
        'gift',
        'git-branch',
        'git-commit',
        'git-merge',
        'git-pull-request',
        'github',
        'gitlab',
        'globe',
        'grid',
        'hard-drive',
        'hash',
        'headphones',
        'heart',
        'help-circle',
        'hexagon',
        'home',
        'image',
        'inbox',
        'info',
        'instagram',
        'italic',
        'key',
        'layers',
        'layout',
        'life-buoy',
        'link-2',
        'link',
        'linkedin',
        'list',
        'loader',
        'lock',
        'log-in',
        'log-out',
        'mail',
        'map-pin',
        'map',
        'maximize-2',
        'maximize',
        'meh',
        'menu',
        'message-circle',
        'message-square',
        'mic-off',
        'mic',
        'minimize-2',
        'minimize',
        'minus-circle',
        'minus-square',
        'minus',
        'monitor',
        'moon',
        'more-horizontal',
        'more-vertical',
        'mouse-pointer',
        'move',
        'music',
        'navigation-2',
        'navigation',
        'octagon',
        'package',
        'paperclip',
        'pause-circle',
        'pause',
        'pen-tool',
        'percent',
        'phone-call',
        'phone-forwarded',
        'phone-incoming',
        'phone-missed',
        'phone-off',
        'phone-outgoing',
        'phone',
        'pie-chart',
        'play-circle',
        'play',
        'plus-circle',
        'plus-square',
        'plus',
        'pocket',
        'power',
        'printer',
        'radio',
        'refresh-ccw',
        'refresh-cw',
        'repeat',
        'rewind',
        'rotate-ccw',
        'rotate-cw',
        'rss',
        'save',
        'scissors',
        'search',
        'send',
        'server',
        'settings',
        'share-2',
        'share',
        'shield-off',
        'shield',
        'shopping-bag',
        'shopping-cart',
        'shuffle',
        'sidebar',
        'skip-back',
        'skip-forward',
        'slack',
        'slash',
        'sliders',
        'smartphone',
        'smile',
        'speaker',
        'square',
        'star',
        'stop-circle',
        'sun',
        'sunrise',
        'sunset',
        'table',
        'tablet',
        'tag',
        'target',
        'terminal',
        'thermometer',
        'thumbs-down',
        'thumbs-up',
        'toggle-left',
        'toggle-right',
        'tool',
        'trash-2',
        'trash',
        'trello',
        'trending-down',
        'trending-up',
        'triangle',
        'truck',
        'tv',
        'twitch',
        'twitter',
        'type',
        'umbrella',
        'underline',
        'unlock',
        'upload-cloud',
        'upload',
        'user-check',
        'user-minus',
        'user-plus',
        'user-x',
        'user',
        'users',
        'video-off',
        'video',
        'voicemail',
        'volume-1',
        'volume-2',
        'volume-x',
        'volume',
        'watch',
        'wifi-off',
        'wifi',
        'wind',
        'x-circle',
        'x-octagon',
        'x-square',
        'x',
        'youtube',
        'zap-off',
        'zap',
        'zoom-in',
        'zoom-out'
      ]
    >;
    submitbutton: ComponentAttribute<'links.button'> & RequiredAttribute;
  };
}

export interface SectionsCyclingsentence extends ComponentSchema {
  info: {
    name: 'cyclingsentence';
    displayName: 'cycling sentence';
    icon: 'align-center';
    description: '';
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

export interface SectionsFullSizeCarousel extends ComponentSchema {
  info: {
    displayName: 'full size carousel';
    icon: 'images';
  };
  attributes: {
    images: MediaAttribute;
  };
}

export interface SectionsLargeSummary extends ComponentSchema {
  info: {
    displayName: 'large summary';
    icon: 'align-center';
    description: '';
  };
  attributes: {
    summarytext: RichTextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<'we are the best bitches in all the land'>;
    moreinfolink: ComponentAttribute<'links.link'>;
    backgroundimage: MediaAttribute;
  };
}

export interface SectionsMultiRoundImageView extends ComponentSchema {
  info: {
    displayName: 'multi round image view';
    icon: 'circle';
    description: '';
  };
  attributes: {
    title: StringAttribute;
    backgroundimage: MediaAttribute;
  };
}

export interface SectionsServicesShowcase extends ComponentSchema {
  info: {
    displayName: 'services showcase';
    icon: 'address-card';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    serviceswipeoptions: ComponentAttribute<'elements.swipe-option', true> &
      RequiredAttribute;
    seemorelink: ComponentAttribute<'links.link'>;
  };
}

export interface SectionsVideoHero extends ComponentSchema {
  info: {
    displayName: 'video hero';
    icon: 'video';
    description: '';
  };
  attributes: {
    videourl: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    cyclingsentence: ComponentAttribute<'sections.cyclingsentence'> &
      RequiredAttribute;
    showscroll: BooleanAttribute;
    primarybutton: ComponentAttribute<'links.button'>;
    secondarybutton: ComponentAttribute<'links.button'>;
    link: ComponentAttribute<'links.button'>;
    videoname: StringAttribute;
    backgroundimage: MediaAttribute;
  };
}

export interface SharedMetaSocial extends ComponentSchema {
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
    description: '';
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
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: MediaAttribute & RequiredAttribute;
    metaSocial: ComponentAttribute<'shared.meta-social', true>;
    keywords: TextAttribute;
    metaRobots: StringAttribute;
    structuredData: JSONAttribute;
    metaViewport: StringAttribute;
    canonicalURL: StringAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::client.client': ApiClientClient;
      'api::contact-message.contact-message': ApiContactMessageContactMessage;
      'api::event.event': ApiEventEvent;
      'api::footer.footer': ApiFooterFooter;
      'api::home.home': ApiHomeHome;
      'api::menu.menu': ApiMenuMenu;
      'api::service.service': ApiServiceService;
      'api::showcase.showcase': ApiShowcaseShowcase;
      'elements.footersection': ElementsFootersection;
      'elements.mobile-menu-item': ElementsMobileMenuItem;
      'elements.socials': ElementsSocials;
      'elements.swipe-option': ElementsSwipeOption;
      'layout.footer': LayoutFooter;
      'layout.navbar': LayoutNavbar;
      'links.button': LinksButton;
      'links.link': LinksLink;
      'sections.contact-form': SectionsContactForm;
      'sections.cyclingsentence': SectionsCyclingsentence;
      'sections.full-size-carousel': SectionsFullSizeCarousel;
      'sections.large-summary': SectionsLargeSummary;
      'sections.multi-round-image-view': SectionsMultiRoundImageView;
      'sections.services-showcase': SectionsServicesShowcase;
      'sections.video-hero': SectionsVideoHero;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
