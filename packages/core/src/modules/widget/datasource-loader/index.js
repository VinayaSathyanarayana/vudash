'use strict'

const datasourceResolver = require('./datasource-resolver')
const configValidator = require('../../config-validator')

class DatasourceLoader {
  load (widgetName, dashboard, widgetOptions) {
    if (!widgetOptions.datasource) { return null }

    const { constructor, options } = datasourceResolver.resolve(dashboard.datasources, widgetOptions.datasource.name)

    const validation = constructor.widgetValidation

    if (validation) {
      configValidator.validate(`widget:${widgetName}`, validation, widgetOptions.datasource.options)
    }

    return new constructor(options)
  }
}

module.exports = new DatasourceLoader()
