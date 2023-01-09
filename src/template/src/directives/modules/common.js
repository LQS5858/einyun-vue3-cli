import { isEmpty } from "lodash";

function downloadBlob ({ value, arg }) {
  let urlString = URL.createObjectURL(value);
  let aTag = document.createElement("a");
  aTag.href = urlString;
  aTag.download = arg;
  aTag.click();
}

export default {
  focus: {
    mounted (el, binding) {
      const { children } = el || {};
      if (isEmpty(children)) {
        el.focus();
      } else {
        const [dom] = el?.children || [];
        if (!dom) return;
        const [child] = dom?.children || [];
        if (!child) return;
        child.focus();
      }
    },
  },
  "download-blob": {
    mounted (el, bindling) {
      const { modifiers, value, arg = "einyun" } = bindling || {};
      if (value?.constructor !== Blob) throw new Error("data does not Blob");
      const { click } = modifiers || {};
      if (!click) throw new Error("click modifiers does not exist");
      el?.addEventListener("click", downloadBlob.bind(this, bindling));
    },
    beforeUnmount (el, bindling) {
      el?.removeEventListener("click", downloadBlob.bind(this, bindling));
    },
  },
  print: {
    mounted (el, bindling) {
      const { value, arg = "einyun", modifiers } = bindling || {};
      const { click } = modifiers || {};
      if (!click) throw new Error("click modifiers does not exist");
      el?.addEventListener("click", () => {
        window.print();
      });
    },
    beforeUnmount (el) {
      el?.removeEventListener("click", () => {
        window.print();
      });
    },
  },
  //图片懒加载
  lazy: {
    mounted (el, bindling) {
      const { value } = bindling || {}
      let observe = new IntersectionObserver(changes => {
        if (changes?.[0]?.['isIntersecting']) {
          el.src = value
          observe.unobserve(el)
        } else {
          el.src = ''
        }
      })
      observe?.observe(el)
    }
  }
};
