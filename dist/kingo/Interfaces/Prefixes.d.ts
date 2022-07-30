/**
 * This is the configuration needed to create valid
 * prefixes.
 *
 * @interface Prefixes
 * @pr {string | null | undefined} pre-request script prefix
 * @body {string | null | undefined} body prefix
 * @docs {string | null | undefined} markdown file prefix
 * @tests {string | null | undefined} test script prefix
 * @variables {string | null | undefined} variables prefix
 */
interface Prefixes {
    request: string;
    prerequestScript?: string | null | undefined;
    body?: string | null | undefined;
    documentation?: string | null | undefined;
    tests?: string | null | undefined;
    variables?: string | null | undefined;
}
export { Prefixes };
