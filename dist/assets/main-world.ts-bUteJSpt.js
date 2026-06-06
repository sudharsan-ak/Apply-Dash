function key(el, k, code, keyCode) {
  el.dispatchEvent(new KeyboardEvent("keydown", { key: k, code, keyCode, bubbles: true, cancelable: true }));
  el.dispatchEvent(new KeyboardEvent("keypress", { key: k, code, keyCode, bubbles: true, cancelable: true }));
  el.dispatchEvent(new KeyboardEvent("keyup", { key: k, code, keyCode, bubbles: true, cancelable: true }));
}
window.addEventListener("__applydash_fill_select", (e) => {
  const { controlAttr } = e.detail;
  const ctrl = document.querySelector(`[data-ad-tmp="${controlAttr}"]`);
  if (!ctrl) return;
  const input = ctrl.querySelector("input") ?? ctrl;
  input.focus();
  key(input, "ArrowDown", "ArrowDown", 40);
});
window.addEventListener("__applydash_select_by_index", (e) => {
  const { controlAttr, idx: idxRaw } = e.detail;
  const idx = parseInt(idxRaw, 10);
  const ctrl = document.querySelector(`[data-ad-tmp="${controlAttr}"]`);
  if (!ctrl) return;
  const input = ctrl.querySelector("input") ?? ctrl;
  if (document.activeElement !== input) input.focus();
  let step = 0;
  function pressNext() {
    if (step < idx) {
      key(input, "ArrowDown", "ArrowDown", 40);
      step++;
      setTimeout(pressNext, 80);
    } else {
      setTimeout(() => key(input, "Enter", "Enter", 13), 80);
    }
  }
  pressNext();
});
window.addEventListener("__applydash_close_select", () => {
  const active = document.activeElement;
  if (active) key(active, "Escape", "Escape", 27);
});
window.addEventListener("__applydash_type_value", (e) => {
  var _a;
  const { selector, value } = e.detail;
  const el = document.querySelector(selector);
  if (!el) return;
  el.focus();
  el.click();
  const nativeSetter = (_a = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")) == null ? void 0 : _a.set;
  if (nativeSetter) nativeSetter.call(el, value);
  else el.value = value;
  el.dispatchEvent(new InputEvent("input", {
    bubbles: true,
    cancelable: true,
    composed: true,
    data: value,
    inputType: "insertText"
  }));
  el.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
});
//# sourceMappingURL=main-world.ts-bUteJSpt.js.map
