[![Build Status](https://img.shields.io/github/workflow/status/misterjoshua/serverless-glob-merge-yaml/CI)](https://github.com/misterjoshua/serverless-glob-merge-yaml/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/misterjoshua/serverless-glob-merge-yaml/badge.svg?branch=master)](https://coveralls.io/github/misterjoshua/serverless-glob-merge-yaml?branch=master)

# Serverless Framework Glob-Merge for YAML

This is a Serverless Framework plugin that lets you merge `serverless.yml` files using Serverless Framework variables from YAML. You write a variable that contains a path glob (i.e., `**/serverless.yml`) to merge YAML files and an optional subpath to select only the data you want from the merged data. This plugin is primarily for splitting `serverless.yml` into smaller chunks without needing to create separate Serverless Framework projects.

## Installation

- Install the package by typing `npm i --save-dev serverless-glob-merge-yaml`.
- Add `serverless-glob-merge-yaml` to your `serverless.yml` plugins section.

## Example `serverless.yml`

**serverless.yml**

```
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
    # iamRoleStatements.
    ${glob-merge-yaml:src/**/serverless.yml:provider.iamRoleStatements}

  environment:
    # Look in env/ for defaults and override based on stage yaml. They are
    # merged in lexicographical order.
    #
    # For example, assume you have a files named:
    #  *  env/0default.yml
    #  *  env/1dev.yml
    #  *  env/1prod.yml
    #
    # In the dev stage, this will merge in this order:
    #  1) env/0default.yml
    #  2) env/1dev.yml
    #
    # In the prod stage, this will merge in this order:
    #  1) env/0default.yml
    #  2) env/1prod.yml
    #
    # See: https://github.com/isaacs/node-glob#glob-primer
    ${glob-merge-yaml:env/*+(default|${opt:stage,'dev'}).yml}

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

The YAML files loaded through `glob-merge-yaml` variable resolution can contain additional `glob-merge-yaml` statements, so be careful not to create circular dependencies. :)
