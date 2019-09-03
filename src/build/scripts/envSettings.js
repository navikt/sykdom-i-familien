const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
  fsExtra.ensureFile(settingsFile).then((f) => {
    fsExtra.writeFileSync(
      settingsFile,
      `window.appSettings = {
                SOK_FORELDREPENGER_URL: '${process.env.SOK_FORELDREPENGER_URL}',
                SOK_FORELDREPENGER_PAPIR_URL: '${process.env.SOK_FORELDREPENGER_PAPIR_URL}',
                SOK_ENGANGSSTONAD_URL: '${process.env.SOK_ENGANGSSTONAD_URL}',
                SOK_ENGANGSSTONAD_PAPIR_URL: '${process.env.SOK_ENGANGSSTONAD_PAPIR_URL}',
                ENDRE_SOKNAD_FORELDREPENGER_URL: '${process.env.ENDRE_SOKNAD_FORELDREPENGER_URL}',
                DINE_FORELDREPENGER_URL: '${process.env.DINE_FORELDREPENGER_URL}',
                SOK_SVANGERSKAPSPENGER_URL: '${process.env.SOK_SVANGERSKAPSPENGER_URL}',
                SOK_SVANGERSKAPSPENGER_PAPIR_URL: '${process.env.SOK_SVANGERSKAPSPENGER_PAPIR_URL}',
                PLANLEGGEREN_URL: '${process.env.PLANLEGGEREN_URL}'
            };`
    );
  });
}
module.exports = createEnvSettingsFile;
