import {readdirSync, readFileSync, unlinkSync, writeFileSync} from 'fs';
import webExt from 'web-ext';

function withManifest(block) {
    const pkg = JSON.parse(readFileSync('package.json').toString('utf-8'));

    const manifest = pkg['web-ext-manifest'];

    const autofill = [
        'name',
        'version',
        'description',
        'author',
        ['homepage_url', 'homepage'],
    ]

    for (const item of autofill) {
        const [to, from] = typeof item === 'object' ? item : [item, item];
        manifest[to] = manifest[to] || pkg[from];
    }

    const text = JSON.stringify(manifest, null, 2);

    writeFileSync('manifest.json', text);
    process.on('exit', () => unlinkSync('manifest.json'));
    return block();
}

function run() {
    return webExt.default.cmd.run({
        sourceDir: process.cwd(), // apparently it doesn't like '.', lol
        artifactsDir: 'dist'
    }, {shouldExitProgram: false})
        .then(runner => new Promise(resolve => runner.registerCleanup(resolve)));
}

function build() {
    return webExt.default.cmd.build({
        artifactsDir: 'dist',
        sourceDir: '.',
        overwriteDest: true,
        ignoreFiles: readdirSync('.').filter(it => !['src', 'manifest.json', 'LICENSE'].includes(it)),
    }, {shouldExitProgram: false})
}

withManifest(process.argv[2] === 'run' ? run : build)
    .catch(console.error);
