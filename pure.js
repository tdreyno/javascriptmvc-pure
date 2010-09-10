steal.plugins('jquery/controller')
        .then("pure-lib", function($) {
  
  $.Controller.extend("$.Controller.Pure", 
  {
    directive:     null,
    dataRefresher: null,
    autoload:      false,
    defaultData:   null,
    listensTo:     ["dataChanged"]
  },
  {
    _data:          {},
    _dataRefresher: null,
  
    setup: function(elem, options) {
      this._super.apply(this, arguments);
      
      if (typeof options === "undefined") {
        options = {};
      }
    
      if (typeof options.data !== "undefined") {
        this._data = options.data;
      } else if (this.Class.defaultData !== null) {
        this._data = this.Class.defaultData;
      }
      
      if (typeof options.dataRefresher !== "undefined") {
        this._dataRefresher = options.dataRefresher;
      } else if (this.Class.dataRefresher !== null) {
        this._dataRefresher = this.Class.dataRefresher;
      }
      
      if ((this.Class.autoload === true) ||
          ((typeof options.autoload !== "undefined") && (options.autoload === true))) {
        this.refresh();
      }
    },
    
    dataChanged: function() {
      this.refresh(true);
    },
    
    setData: function(data) {
      this._data = data;
      this.element.trigger("dataChanged");
    },
    
    refresh: function(alreadyHasData) {
      if (!alreadyHasData && $.isFunction(this._dataRefresher)) {
        this._dataRefresher.apply(this, []); 
      } else {
        if (this.Class.directive) {
          this.element.render(this._data, this.Class.directive);
        } else {
          this.element.autoRender(this._data);
        }
      }      
    }
  });
	
});
