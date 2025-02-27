import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { registerSystem } from '../core/system.js';

function fetchScript (src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = src;
  });
}

/**
 * glTF model system.
 *
 * Configures glTF loading options. Models using glTF compression require that a Draco decoder be
 * provided externally.
 *
 * @param {string} dracoDecoderPath - Base path from which to load Draco decoder library.
 * @param {string} basisTranscoderPath - Base path from which to load Basis transcoder library.
 * @param {string} meshoptDecoderPath - Full path from which to load Meshopt decoder.
 */
export var System = registerSystem('gltf-model', {
  schema: {
    dracoDecoderPath: {default: 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'},
    basisTranscoderPath: {default: ''},
    meshoptDecoderPath: {default: ''}
  },

  init: function () {
    this.update();
  },

  update: function () {
    var dracoDecoderPath = this.data.dracoDecoderPath;
    var basisTranscoderPath = this.data.basisTranscoderPath;
    var meshoptDecoderPath = this.data.meshoptDecoderPath;
    if (!this.dracoLoader && dracoDecoderPath) {
      this.dracoLoader = new DRACOLoader();
      this.dracoLoader.setDecoderPath(dracoDecoderPath);
    }
    if (!this.ktx2Loader && basisTranscoderPath) {
      this.ktx2Loader = new KTX2Loader();
      this.ktx2Loader.setTranscoderPath(basisTranscoderPath).detectSupport(this.el.renderer);
    }
    if (!this.meshoptDecoder && meshoptDecoderPath) {
      this.meshoptDecoder = fetchScript(meshoptDecoderPath)
        .then(function () { return window.MeshoptDecoder.ready; })
        .then(function () { return window.MeshoptDecoder; });
    }
  },

  getDRACOLoader: function () {
    return this.dracoLoader;
  },

  getKTX2Loader: function () {
    return this.ktx2Loader;
  },

  getMeshoptDecoder: function () {
    return this.meshoptDecoder;
  }
});
