[![Serverless][serverless-badge]][serverless-badge-url]
[![Build Status][build-badge]][build-badge-url]
[![End-to-end Test Status][e2e-test-badge]][e2e-test-badge-url]
[![Coverage Status][coverage-badge]][coverage-badge-url]

# Serverless Framework Glob-Merge for YAML

This is a Serverless Framework plugin that lets you merge `serverless.yml` files using Serverless Framework variables from YAML. You write a variable that contains a path glob (i.e., `**/serverless.yml`) to merge YAML files and an optional subpath to select only the data you want from the merged YAML.

This plugin is primarily intended for splitting `serverless.yml` into smaller chunks without needing to create separate Serverless Framework projects or custom `${file(./script.js)}` scripts.

## Requirements

- Serverless Framework >= 1.52

## Installation

- Install the package by typing `npm i --save-dev serverless-glob-merge-yaml`.
- Add `serverless-glob-merge-yaml` to your `serverless.yml` plugins section.
- Change your variable syntax to allow globs in variable references. (See the example below.)

## Example `serverless.yml`

**serverless.yml**

```yaml
service:
  name: test

plugins:
  - serverless-glob-merge-yaml

provider:
  name: aws
  runtime: nodejs12.x
  
  # Change the variable syntax to allow *, +, and | in the variables.
  variableSyntax: "\\${([ *+|~:a-zA-Z0-9._@\\'\",\\-\\/\\(\\)]+?)}"

  iamRoleStatements:
    # Look for serverless.yml in src/ and subdirectories and get the
    # iamRoleStatements from the merged YAML.
    ${glob-merge-yaml:src/**/serverless.yml:provider.iamRoleStatements}

  environment:
    # Provide defaults use stage overrides. The YAML is merged in
    # lexicographical order from env/
    ${glob-merge-yaml:env/*+(default|${opt:stage,'dev'}).yml}

    # The above works like this: Assume you have a files named
    #  env/0default.yml
    #  env/1dev.yml
    #  env/1prod.yml
    #
    # In the dev stage, YAML will merge in this order:
    #  1) env/0default.yml
    #  2) env/1dev.yml
    #
    # In the prod stage, YAML will merge in this order:
    #  1) env/0default.yml
    #  2) env/1prod.yml
    #
    # See: https://github.com/isaacs/node-glob#glob-primer

functions:
  # Merge all functions.yml in src/
  ${glob-merge-yaml:src/**/functions.yml}

resources:
  # Merge all resources.yml in src/
  ${glob-merge-yaml:src/**/resources.yml}
```

## Variable Syntax

The syntax of the variable expression is broken down like this: `${glob-merge-yaml:PATH_GLOB:SUB_PATH}`

- `glob-merge-yaml` - This is the plugin's variable prefix.
- `PATH_GLOB` - Replace this with a path glob. The glob syntax is based on the [`glob` package](https://github.com/isaacs/node-glob#readme)
- `SUB_PATH` - This is an object path that can be used to traverse the merged data structure. You can omit the subpath to return the merged data structure.

## Recursion

The YAML files merged with `glob-merge-yaml` can contain additional `glob-merge-yaml` statements, so be careful not to create circular references. :)

## Contributing

Pull requests are welcome! Especially test scenarios for different situations and configurations.

[serverless-badge]: http://public.serverless.com/badges/v3.svg
[serverless-badge-url]: http://www.serverless.com
[build-badge]: https://img.shields.io/github/workflow/status/misterjoshua/serverless-glob-merge-yaml/CI
[build-badge-url]: https://github.com/misterjoshua/serverless-glob-merge-yaml/actions?query=workflow%3ACI
[e2e-test-badge]: https://img.shields.io/github/workflow/status/misterjoshua/serverless-glob-merge-yaml-e2e/CI?label=e2e%20test%20status
[e2e-test-badge-url]: https://github.com/misterjoshua/serverless-glob-merge-yaml-e2e/actions?query=workflow%3ACI
[coverage-badge]: https://coveralls.io/repos/github/misterjoshua/serverless-glob-merge-yaml/badge.svg?branch=master
[coverage-badge-url]: https://coveralls.io/github/misterjoshua/serverless-glob-merge-yaml?branch=master