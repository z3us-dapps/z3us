import { defineManifest } from '@crxjs/vite-plugin';
import { version } from '../../../package.json';
import matches from './content_matches.json';
import hosts from './host_permissions.json';
var protocols = ['https://*/*'];
var _a = version.replace(/[^\d.-]+/g, '').split(/[.-]/), major = _a[0], minor = _a[1], patch = _a[2], _b = _a[3], label = _b === void 0 ? '0' : _b;
var permissions = [
    'storage',
    'offscreen',
    'unlimitedStorage',
    'notifications',
    'activeTab',
    'scripting',
    'contextMenus',
];
var hostPermissions = hosts.concat([]);
var contentScriptsMatches = matches.concat([]);
if (process.env.NODE_ENV === 'development') {
    protocols.push('http://*/*');
    hostPermissions = hosts.concat(protocols);
    contentScriptsMatches = matches.concat(protocols);
}
var manifest = {
    manifest_version: 3,
    version: "".concat(major, ".").concat(minor, ".").concat(patch, ".").concat(label),
    version_name: version,
    author: 'https://z3us.com',
    name: 'Z3US',
    short_name: 'Z3US',
    description: 'An open source community centered browser wallet for the Radix DLT network.',
    omnibox: { keyword: 'z3us' },
    action: {
        default_popup: 'src/pages/dashboard/popup-theme-system.html',
        default_title: 'Z3US',
        default_icon: {
            '16': 'favicon-16x16.png',
            '48': 'favicon-48x48.png',
            '128': 'favicon-128x128.png'
        }
    },
    commands: {
        _execute_action: {
            suggested_key: {
                "default": 'Alt+Shift+Z',
                windows: 'Alt+Shift+Z',
                mac: 'Alt+Shift+Z',
                chromeos: 'Alt+Shift+Z',
                linux: 'Alt+Shift+Z'
            }
        }
    },
    icons: {
        '16': 'favicon-16x16.png',
        '48': 'favicon-48x48.png',
        '128': 'favicon-128x128.png'
    },
    permissions: permissions,
    host_permissions: hostPermissions,
    background: {
        service_worker: 'src/browser/background.ts',
        type: 'module'
    },
    content_scripts: [
        {
            matches: contentScriptsMatches,
            run_at: 'document_start',
            all_frames: true,
            js: ['src/browser/content-script.ts']
        },
    ]
};
export default defineManifest(manifest);
