import {readdir, readFile, unlink, writeFile} from 'fs/promises';
import webExt from 'web-ext';

async function withManifest(block) {
    const buffer = await readFile('package.json');
    const pkg = JSON.parse(buffer.toString('utf-8'));

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

    await writeFile('manifest.json', text);
    try {
        await block();
    } finally {
        await unlink('manifest.json');
    }
}

function run() {
    return webExt.default.cmd.run({
            sourceDir: process.cwd(), // apparently it doesn't like '.', lol
            artifactsDir: 'dist'
        }, {shouldExitProgram: false})
            .then(runner => new Promise(resolve => runner.registerCleanup(resolve)));
}

async function build() {
    const files = await readdir('.');
    await webExt.default.cmd.build({
        artifactsDir: 'dist',
        sourceDir: '.',
        overwriteDest: true,
        ignoreFiles: files.filter(it => it !== 'src' && it !== 'manifest.json' && it !== 'LICENSE'),
    }, {shouldExitProgram: false})
}

withManifest(process.argv[2] === 'run' ? run : build)
    .catch(console.error);
