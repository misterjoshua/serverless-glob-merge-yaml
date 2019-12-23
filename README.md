[![Build Status](https://img.shields.io/github/workflow/status/misterjoshua/serverless-glob-merge-yaml/CI)](https://github.com/misterjoshua/serverless-glob-merge-yaml/actions?query=workflow%3ACI)

# Serverless Framework Glob Merger for Yaml

This is a Serverless Framework plugin that lets you use variables to deep-merge YAML files that match globbing formats (`**/serverless.yml`) and select only the data you want from the merged data. This plugin is primarily for splitting `serverless.yml` into smaller chunks without needing to create separate Serverless Framework projects.

## Installation

- Install the package by typing `npm i --save-dev serverless-glob-merge-yaml`.
- Add `serverless-glob-merge-yaml` to your `serverless.yml` plugins section.

## Example `serverless.yml`

This example `serverless.yml` does the following:

- Merges all `iamRoleStatements` in files named `serverless.yml` in any directory under `src/`.
- Merges all `environment` variables in files named `serverless.yml` in any directory under `src/`.
- Merges all `functions` from files named `functions.yml` in any directory underh `src/`.
- Merges all `resources` from files named `resources.yml` in any directory under `src/`

**serverless.yml**

```
service:
  name: test

plugins:
  - serverless-glob-merge-yaml

provider:
  name: aws
  runtime: nodejs12.x
  iamRoleStatements:
    ${glob-merge-yaml:src/**/serverless.yml:provider.iamRoleStatements}
  environment:
    ${glob-merge-yaml:src/**/serverless.yml:provider.environment}

functions:
  ${glob-merge-yaml:src/**/functions.yml:functions}

resources:
  ${glob-merge-yaml:src/**/resources.yml:resources}
```

## Variable Syntax

The syntax of the variable expression is broken down like this: `${glob-merge-yaml:PATH_GLOB:SUB_PATH}`

- `glob-merge-yaml` - This is the plugin's variable prefix.
- `PATH_GLOB` - Replace this with a path glob. The glob syntax is based on the [`glob` package](https://github.com/isaacs/node-glob#readme)
- `SUB_PATH` - This is an object path that can be used to traverse the merged data structure. You can omit the subpath to return the merged data structure.

## Recursion

The YAML files loaded through `glob-merge-yaml` variable resolution can contain additional `glob-merge-yaml` statements, so be careful not to create circular dependencies. :)
