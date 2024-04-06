<template>
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div v-if="header.visible" class="modal-header">
                    <div class="modal-title">
                        {{ title }}
                        <slot name="header" />
                    </div>
                </div>
                <div class="modal-body">
                    <slot />
                </div>
                <div v-if="footer.visible" class="modal-footer">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/js/dist/modal'

export default {
    name: 'CoolModal',
    props: {
        visible: {
            type: Boolean, default: false,
        },
        title: String,
        width: String,
        header: {
            type: Object, default() {
                return { visible: true }
            }
        },
        footer: {
            type: Object, default() {
                return {
                    visible: true,
                }
            }
        },
    },
    watch: {
        visible(_new) {
            _new ? $(this.$el).modal('show') : $(this.$el).modal('hide');
        }
    },
    mounted() {
        if (this.visible) $(this.$el).modal('show');

        $(this.$el).on('show.bs.modal', e => {
            this.$emit('show');
        }).on('shown.bs.modal', e => {
            this.$emit('shown');
        }).on('hide.bs.modal', e => {
            this.$emit('hide');
        }).on('hidden.bs.modal', e => {
            this.$emit('hidden');
        }).on('loaded.bs.modal', e => {
            this.$emit('loaded');
        });
    }
}
</script>

<style scoped lang="scss">
</style>