<template>
    <div class="card">
        <div class="card-header">
            <div class="flex-title">
                <strong>{{ title }}</strong>
                <div>
                    <button class="btn btn-primary btn-sm mr-1" @click="ok">
                        确定
                    </button>
                    <button class="btn btn-secondary btn-sm" @click="close">
                        取消
                    </button>
                </div>
            </div>
        </div>
        <div class="list-group list-group-flush">
            <div
                v-for="(d, i) in data"
                :key="i"
                class="list-group-item list-group-item-action text-left"
                draggable="true"
                @dragstart="drag($event, i)"
                @dragover.prevent
                @drop="drop($event, i)"
            >
                {{ d.label }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CoolSorter',
    data() {
        return {
            data: JSON.parse(JSON.stringify(this.value))
        }
    },
    props: {
        // [{key, label}]
        value: Array,
        title: {
            type: String, default: '排序'
        }
    },
    watch: {
        value() {
            this.data = JSON.parse(JSON.stringify(this.value));
        }
    },
    methods: {
        drag(ev, i) {
            ev.dataTransfer.setData("i", i);
        },
        drop(ev, j) {
            const i = ev.dataTransfer.getData('i')

            const target = this.data[i];
            this.data.splice(i, 1);
            this.data.splice(j, 0, target);
        },
        ok() {
            this.$emit('ok', this.data);
        },
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped lang="scss">
.list-group {
    height: 300px;
    overflow: hidden auto;
}

.list-group-flush > .list-group-item:last-child {
    border-bottom-width: 1px;
}

.flex-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>