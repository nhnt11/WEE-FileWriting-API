ChromeUtils.defineModuleGetter(this, "ExtensionCommon",
                               "resource://gre/modules/ExtensionCommon.jsm");
ChromeUtils.defineModuleGetter(this, "OS", "resource://gre/modules/osfile.jsm")

this.filewriting = class extends ExtensionAPI {
  getAPI(context) {
    return {
      filewriting: {
        async writeFile(path, data) {
          let encoder = new TextEncoder();
          let array = encoder.encode(data);
          try {
            await OS.File.writeAtomic(path, array,
                {tmpPath: path + ".tmp"});
            return true;
          } catch (e) {
            Cu.reportError(e);
            return false;
          }
        },
      },
    };
  }
};
