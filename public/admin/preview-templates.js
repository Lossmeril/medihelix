/*
 * Custom Decap CMS preview templates.
 *
 * There is no build step for public/admin (Decap is loaded straight from
 * unpkg), so this is plain JS using the `h`/`createClass` globals Decap
 * itself exposes on window (its own bundled React instance) instead of
 * JSX + a bundler. Markup/classes below are copied from the real page
 * components so the preview reads like the live site.
 */
(function () {
  var h = window.h;
  var createClass = window.createClass;

  // ---------------------------------------------------------------------
  // small helpers
  // ---------------------------------------------------------------------

  function formatDate(value) {
    if (!value) return "";
    var d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("cs-CZ");
  }

  function toJS(immutableValue, fallback) {
    if (immutableValue && typeof immutableValue.toJS === "function") {
      return immutableValue.toJS();
    }
    return fallback;
  }

  function Divider(props) {
    var style = { backgroundColor: "var(--dark)" };
    if (props && props.marginTop) style.marginTop = props.marginTop;
    if (props && props.marginBottom) style.marginBottom = props.marginBottom;
    return h("span", { className: "w-full h-px opacity-35 block", style: style });
  }

  function Badge(text, className) {
    return h(
      "span",
      { className: "inline-block rounded px-2 py-1 text-xs font-medium " + className },
      text,
    );
  }

  function LinkPill(label, variant) {
    var styles = {
      primary: "bg-sky text-white",
      secondary: "bg-light text-sky",
    };
    return h(
      "span",
      {
        className:
          "inline-block rounded-md text-sm font-semibold px-3.5 py-2.5 shadow-xs " +
          (styles[variant] || styles.primary),
      },
      label + " →",
    );
  }

  function SectionTitle(text) {
    return h("h2", { className: "text-2xl font-semibold mb-4" }, text);
  }

  function EmptyImage(label) {
    return h(
      "div",
      {
        className:
          "w-full aspect-square rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm",
      },
      label || "Bez obrázku",
    );
  }

  // Mirrors app/instruments/.../page.tsx "Přednosti" section
  function FeatureGrid(features) {
    if (!features || features.length === 0) return null;
    return h(
      "section",
      { className: "mb-12" },
      SectionTitle("Přednosti"),
      h(
        "ul",
        { className: "space-x-3 space-y-3 grid grid-cols-1 md:grid-cols-2" },
        features.map(function (f, idx) {
          return h(
            "li",
            { key: idx, className: "py-2" },
            h("h3", { className: "font-medium" }, f.title),
            f.description &&
              h("p", { className: "text-gray-600 text-sm mt-1" }, f.description),
          );
        }),
      ),
    );
  }

  // Mirrors the "Specifikace" zebra-striped rows
  function SpecsTable(specs) {
    if (!specs || specs.length === 0) return null;
    return h(
      "section",
      { className: "mb-12" },
      SectionTitle("Specifikace"),
      h(
        "div",
        { className: "grid grid-cols-1 border-t border-gray-200" },
        specs.map(function (s, idx) {
          return h(
            "div",
            {
              key: idx,
              className:
                "bg-gray-100 odd:bg-white grid grid-cols-2 border-b border-gray-200 px-4 py-2",
            },
            h("h3", { className: "font-medium" }, s.name),
            h(
              "p",
              { className: "text-gray-700" },
              [s.value, s.unit].filter(Boolean).join(" "),
            ),
          );
        }),
      ),
    );
  }

  // Mirrors test_groups / target_groups Card grids
  function GroupCards(title, groups, summaryFn) {
    if (!groups || groups.length === 0) return null;
    return h(
      "section",
      { className: "mb-12" },
      SectionTitle(title),
      h(
        "div",
        { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
        groups.map(function (g, idx) {
          var summary = summaryFn(g);
          return h(
            "div",
            { key: idx, className: "card h-full card-light" },
            h(
              "div",
              { className: "card-content h-full relative flex flex-col p-4" },
              h("h3", { className: "font-medium mb-2" }, g.name),
              summary && h("div", { className: "text-xs text-gray-500" }, summary),
            ),
          );
        }),
      ),
    );
  }

  function IntendedUse(items) {
    if (!items || items.length === 0) return null;
    return h(
      "section",
      { className: "mb-12" },
      SectionTitle("Použití"),
      h(
        "div",
        { className: "flex flex-row flex-wrap gap-3" },
        items.map(function (place, idx) {
          return h(
            "span",
            {
              key: idx,
              className:
                "text-sm lg:text-base text-sky-700 font-semibold px-3 py-2 rounded-lg bg-sky-50",
            },
            place,
          );
        }),
      ),
    );
  }

  function TagsRow(tags) {
    if (!tags || tags.length === 0) return null;
    return h(
      "p",
      { className: "text-sm text-gray-600 mt-4" },
      "Tagy: ",
      tags.map(function (tag, idx) {
        return h(
          "span",
          { key: idx, className: "text-sky-500" },
          tag + (idx < tags.length - 1 ? ", " : ""),
        );
      }),
    );
  }

  function GalleryGrid(images, title) {
    if (!images || images.length === 0) return null;
    return h(
      "section",
      { className: "mb-12" },
      SectionTitle("Galerie"),
      h(
        "div",
        { className: "grid grid-cols-2 md:grid-cols-5 gap-4" },
        images.map(function (img, idx) {
          return h("img", {
            key: idx,
            src: img,
            alt: title + " " + (idx + 2),
            className: "w-full aspect-[4/3] object-cover rounded-lg shadow",
          });
        }),
      ),
    );
  }

  // Mirrors components/quickTestTabs.tsx — the only field that needs its
  // own interactive state to preview well (tab switching).
  var QuickTestTabsPreview = createClass({
    getInitialState: function () {
      return { active: 0 };
    },
    render: function () {
      var groups = this.props.groups || [];
      var filled = groups.filter(function (g) {
        return g.items && g.items.length > 0;
      });
      if (filled.length === 0) return null;

      var active = Math.min(this.state.active, filled.length - 1);
      var group = filled[active];
      var items = group.items || [];
      var hasSpecimen = items.some(function (i) { return !!i.specimen; });
      var hasFormat = items.some(function (i) { return !!i.format; });
      var hasCutOff = items.some(function (i) { return !!i.cut_off; });
      var hasCeMark = items.some(function (i) { return !!i.ce_mark; });
      var hasNote = items.some(function (i) { return !!i.note; });
      var setActive = this.setState.bind(this);

      return h(
        "section",
        { className: "mb-12" },
        SectionTitle("Katalog produktů"),
        filled.length > 1 &&
          h(
            "div",
            { className: "flex flex-wrap border-b border-gray-200 mb-0" },
            filled.map(function (g, idx) {
              return h(
                "button",
                {
                  key: idx,
                  type: "button",
                  onClick: function () {
                    setActive({ active: idx });
                  },
                  className:
                    "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors " +
                    (idx === active
                      ? "border-sky-600 text-sky-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),
                },
                g.name,
              );
            }),
          ),
        h(
          "div",
          { className: "overflow-x-auto border border-gray-200 rounded-b-md" },
          h(
            "table",
            { className: "w-full text-sm border-collapse" },
            h(
              "thead",
              null,
              h(
                "tr",
                {
                  className:
                    "bg-gray-100 text-left text-xs uppercase tracking-wide text-gray-500",
                },
                h("th", { className: "px-4 py-3 font-semibold" }, "Produkt"),
                h(
                  "th",
                  { className: "px-4 py-3 font-semibold whitespace-nowrap" },
                  "Kat. číslo",
                ),
                hasSpecimen && h("th", { className: "px-4 py-3 font-semibold" }, "Vzorek"),
                hasFormat && h("th", { className: "px-4 py-3 font-semibold" }, "Formát"),
                hasCutOff && h("th", { className: "px-4 py-3 font-semibold" }, "Cut-Off"),
                hasNote && h("th", { className: "px-4 py-3 font-semibold" }, "Balení"),
                hasCeMark && h("th", { className: "px-4 py-3 font-semibold" }, "CE"),
              ),
            ),
            h(
              "tbody",
              null,
              items.map(function (item, idx) {
                return h(
                  "tr",
                  {
                    key: idx,
                    className:
                      "border-b border-gray-200 last:border-0 even:bg-gray-50 hover:bg-sky-50 transition-colors",
                  },
                  h("td", { className: "px-4 py-2.5" }, item.name),
                  h(
                    "td",
                    { className: "px-4 py-2.5 font-mono text-xs text-gray-700 whitespace-nowrap" },
                    item.cat_no,
                  ),
                  hasSpecimen &&
                    h("td", { className: "px-4 py-2.5 text-gray-600" }, item.specimen || "—"),
                  hasFormat &&
                    h("td", { className: "px-4 py-2.5 text-gray-600" }, item.format || "—"),
                  hasCutOff &&
                    h("td", { className: "px-4 py-2.5 text-gray-600" }, item.cut_off || "—"),
                  hasNote &&
                    h("td", { className: "px-4 py-2.5 text-gray-600" }, item.note || "—"),
                  hasCeMark &&
                    h(
                      "td",
                      { className: "px-4 py-2.5" },
                      item.ce_mark
                        ? Badge(item.ce_mark, "bg-sky-100 text-sky-700")
                        : "—",
                    ),
                );
              }),
            ),
          ),
        ),
      );
    },
  });

  // ---------------------------------------------------------------------
  // blog
  // ---------------------------------------------------------------------

  function BlogPreview(props) {
    var entry = props.entry;
    var title = entry.getIn(["data", "title"], "");
    var image = entry.getIn(["data", "image"], "");
    var date = entry.getIn(["data", "date"]);

    return h(
      "main",
      { className: "max-w-3xl mx-auto px-6 py-10" },
      image &&
        h(
          "div",
          { className: "card h-40 mb-8" },
          h(
            "div",
            { className: "card-content h-full relative flex flex-col" },
            h("img", {
              src: image,
              alt: title,
              className: "w-full h-full object-cover",
            }),
          ),
        ),
      h("h1", { className: "text-black text-4xl font-black mt-4" }, title),
      date &&
        h(
          "p",
          { className: "text-sm font-bold text-sky-500 my-8" },
          formatDate(date),
        ),
      h("article", { className: "prose-preview" }, props.widgetFor("body")),
    );
  }

  // ---------------------------------------------------------------------
  // companies
  // ---------------------------------------------------------------------

  function CompanyPreview(props) {
    var entry = props.entry;
    var name = entry.getIn(["data", "name"], "");
    var logo = entry.getIn(["data", "logo"], "");
    var website = entry.getIn(["data", "website"], "");
    var description = entry.getIn(["data", "description"], "");
    var visible = entry.getIn(["data", "visible"]);
    var showIfEmpty = entry.getIn(["data", "show_if_empty"]);

    return h(
      "main",
      { className: "max-w-3xl mx-auto px-6 py-10" },
      logo &&
        h("img", { src: logo, alt: name, className: "h-20 object-contain mb-4" }),
      h("h1", { className: "text-2xl lg:text-3xl font-bold mb-2" }, name),
      website &&
        h(
          "a",
          {
            href: website,
            target: "_blank",
            rel: "noreferrer",
            className: "text-sky-600 hover:underline text-sm",
          },
          website,
        ),
      h("p", { className: "text-sm lg:text-base text-gray-600 mt-4" }, description),
      Divider({ marginTop: "1.5rem", marginBottom: "1.5rem" }),
      h(
        "div",
        { className: "flex gap-2" },
        visible === false
          ? Badge("Skryto", "bg-gray-200 text-gray-600")
          : Badge("Viditelné", "bg-sky-100 text-sky-700"),
        showIfEmpty && Badge("Zobrazit i bez produktů", "bg-sky-50 text-sky-600"),
      ),
      h("div", { className: "prose-preview mt-8" }, props.widgetFor("body")),
    );
  }

  // ---------------------------------------------------------------------
  // subcategories
  // ---------------------------------------------------------------------

  function SubcategoryPreview(props) {
    var entry = props.entry;
    var name = entry.getIn(["data", "name"], "");
    var description = entry.getIn(["data", "description"], "");

    return h(
      "main",
      { className: "max-w-2xl mx-auto px-6 py-10" },
      h("h1", { className: "text-2xl lg:text-3xl font-bold mb-2" }, name),
      h(
        "div",
        { className: "meta-relation text-sm text-gray-500 mb-4" },
        "Nadřazená kategorie: ",
        props.widgetFor("parent"),
      ),
      h("p", { className: "text-gray-600" }, description),
    );
  }

  // ---------------------------------------------------------------------
  // shared product preview (instruments / quick-tests / consumables)
  // ---------------------------------------------------------------------

  function ProductPreview(props, opts) {
    var entry = props.entry;
    var get = function (name, fallback) {
      return entry.getIn(["data", name], fallback);
    };
    var getList = function (name) {
      return toJS(entry.getIn(["data", name]), []) || [];
    };

    var title = get("title", "");
    var summary = get("summary", "");
    var heroImage = get("hero_image", "");
    var gallery = getList("gallery");
    var price = get("price", "");
    var sku = get("sku", "");
    var tags = getList("tags");
    var featured = get("featured");
    var visible = get("visible");
    var features = getList("features");
    var specs = getList("specs");
    var intendedUse = getList("intended_use");
    var assets = toJS(get("assets"), {}) || {};

    return h(
      "main",
      { className: "max-w-4xl mx-auto px-6 py-10" },

      (featured || visible === false) &&
        h(
          "div",
          { className: "flex gap-2 mb-4" },
          featured && Badge("Vypíchnutý produkt", "bg-sky-100 text-sky-700"),
          visible === false && Badge("Skryto", "bg-gray-200 text-gray-600"),
        ),

      h(
        "div",
        { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" },
        heroImage
          ? h("img", {
              src: heroImage,
              alt: title,
              className: "w-full aspect-square object-cover rounded-xl shadow",
            })
          : EmptyImage(),
        h(
          "div",
          null,
          h("h1", { className: "text-2xl lg:text-3xl font-bold mb-2" }, title),
          h(
            "div",
            { className: "meta-relation text-sm text-sky-600 mb-2" },
            props.widgetFor("companies"),
          ),
          Divider(),
          h("p", { className: "text-base lg:text-lg text-gray-600 mt-4" }, summary),
          price && h("p", { className: "mt-4 text-xl font-bold text-sky-700" }, price),
          sku && h("p", { className: "font-medium text-sm mt-4" }, "Objednací číslo: " + sku),
          TagsRow(tags),
        ),
      ),

      GalleryGrid(gallery, title),
      IntendedUse(intendedUse),
      FeatureGrid(features),

      opts.targetGroups &&
        GroupCards("Detekované cíle", getList("target_groups"), function (g) {
          return (g.targets || [])
            .map(function (t) {
              return t.alias ? t.name + " (" + t.alias + ")" : t.name;
            })
            .join(", ");
        }),

      opts.testGroups &&
        GroupCards("Nabídka testů", getList("test_groups"), function (g) {
          return (g.tests || [])
            .map(function (t) {
              return t.name;
            })
            .join(", ");
        }),

      SpecsTable(specs),

      opts.tabsTable && h(QuickTestTabsPreview, { groups: getList("groups") }),
      opts.tabsTable &&
        get("table_note") &&
        h("p", { className: "text-sm text-gray-600 -mt-6 mb-12" }, get("table_note")),

      opts.markdownBody &&
        h("div", { className: "prose-preview mt-8 mb-12" }, props.widgetFor("body")),

      (assets.datasheet || assets.external_url || assets.eshop_url || assets.ifu) &&
        h("div", { className: "mb-6" }, Divider()),

      h(
        "div",
        { className: "flex flex-wrap gap-3" },
        assets.eshop_url && LinkPill("Koupit v e-shopu", "primary"),
        assets.datasheet && LinkPill("Datový list (PDF)", "secondary"),
        assets.ifu && LinkPill("Návod k použití (IFU)", "secondary"),
        assets.external_url && LinkPill("Externí odkaz", "secondary"),
      ),
    );
  }

  // ---------------------------------------------------------------------
  // register
  // ---------------------------------------------------------------------

  CMS.registerPreviewTemplate("blog", BlogPreview);
  CMS.registerPreviewTemplate("companies", CompanyPreview);
  CMS.registerPreviewTemplate("subcategories", SubcategoryPreview);
  CMS.registerPreviewTemplate("instruments", function (props) {
    return ProductPreview(props, { testGroups: true });
  });
  CMS.registerPreviewTemplate("quick-tests", function (props) {
    return ProductPreview(props, { targetGroups: true, tabsTable: true });
  });
  CMS.registerPreviewTemplate("consumables", function (props) {
    return ProductPreview(props, { markdownBody: true });
  });
})();
