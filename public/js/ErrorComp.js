const error = {
    data(){
        return {
            text: ''
        }
    },
    methods: {
        setText(value){
            this.text = value;
        }
    },
    template: `<div class="error-block" v-if="text" @click.self="setText('')">
                    <p class="error-msg">
                    <button class="close-btn" @click="setText('')">&times;</button>
                    {{text}}
                    </p>
                </div>`
};