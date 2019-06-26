const filterComp = {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" method="post" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <input class="header__input" type="text" placeholder="Search for Item..." v-model="userSearch">
                    <button class="header__btn" type="submit"><i class="fas fa-search"></i></button>
                </form>`
};
