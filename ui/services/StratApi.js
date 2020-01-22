const StratApi = {
  install: (Vue, options) => {
    Vue.mixin({
      methods: {
        speak: async function(val) {
          console.log(`it says ${val}`);
          return 'coo';
        }
      }
    });
  }
};

export default StratApi;
