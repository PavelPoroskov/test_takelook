const { injectBabelPlugin } = require('react-app-rewired');
//const rewireLess = require('react-app-rewire-less');

  module.exports = function override(config, env) {
//  config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);

    // config = injectBabelPlugin( [
    //     ['import', { 
    //         libraryName: 'antd', 
    //         style: true 
    //         }
    //     ],
    //     "transform-object-rest-spread",
    //     "transform-es2015-computed-properties"
    //   ], config );  // change importing css to less

    // config = injectBabelPlugin( ['import', { 
    //         libraryName: 'antd', 
    //         style: true 
    //         }
    //     ], config );  // change importing css to less

    config = injectBabelPlugin( ['import', { 
            libraryName: 'antd', 
            style: 'css' 
            }
        ], config );  // change importing css to less

    config = injectBabelPlugin( "transform-object-rest-spread", config );  
    config = injectBabelPlugin( "transform-es2015-computed-properties", config );  

    // config = rewireLess.withLoaderOptions({
    //   modifyVars: { "@primary-color": "#1DA57A" },
    // })(config, env);

    return config;
  };