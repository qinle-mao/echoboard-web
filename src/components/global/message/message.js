import { createVNode, render } from "vue";
import MessageV from "./Message.vue";

const divVNode = createVNode('div', {class: 'xtx-message-container'})
render(divVNode, document.body)

const div = divVNode.el
const Message = ({message, type}) => {
    // create virtual dom
    const domVNode = createVNode(MessageV, {message, type})
    render(domVNode, div)
    setTimeout(() => {
        render(null, div)
    }, 6000)
}

export default Message