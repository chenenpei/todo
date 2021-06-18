<template>
    <n-list-item class="task-item-wrapper">
        <template #prefix>
            <n-icon size="16">
                <drag-indicator-outlined />
            </n-icon>
        </template>
        <swiper
            :initial-slide="1"
            :slides-per-view="1"
            :resistance-ratio="0"
            :speed="200"
            @transitionEnd="onTransitionEnd"
            @activeIndexChange="onActiveIndexChange"
        >
            <swiper-slide
                v-if="task.status === TASK_STATUS.INCOMPLETE"
                class="complete-slide"
                ><span>完成</span></swiper-slide
            >
            <swiper-slide
                v-if="task.status === TASK_STATUS.COMPLETE"
                class="archive-slide"
                ><span>归档</span></swiper-slide
            >
            <swiper-slide class="main-slide">
                <span
                    :class="
                        task.status === TASK_STATUS.COMPLETE ? 'complete' : ''
                    "
                >
                    {{ task.content }}
                </span>
            </swiper-slide>
            <swiper-slide class="delete-slide"><span>删除</span></swiper-slide>
        </swiper>
    </n-list-item>
</template>

<script setup>
import { defineProps, defineEmit } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { NListItem, NIcon } from "naive-ui";
import { DragIndicatorOutlined } from "@vicons/material";
import { TASK_STATUS } from "../store/index";

const props = defineProps({
    task: Object,
    taskIndex: Number,
});
const emit = defineEmit(["delete", "complete", "archive"]);

const onTransitionEnd = (instance) => {
    const { activeIndex } = instance;
    if (activeIndex === 2) {
        emit("delete");
        instance.destroy();
    }
};

const onActiveIndexChange = (instance) => {
    const { activeIndex } = instance;
    if (activeIndex === 0) {
        if (props.task.status === TASK_STATUS.COMPLETE) emit("archive");
        if (props.task.status === TASK_STATUS.INCOMPLETE) emit("complete");
        instance.slideTo(1);
    }
};
</script>

<style lang="postcss">
.task-item-wrapper {
    padding: 0 !important;
    border: 1px solid var(--merged-border-color);
    cursor: move;

    & .n-list-item__prefix {
        margin: 0px !important;
        padding: 8px;
        display: flex;
    }

    & .swiper-container {
        width: 100%;
        height: 100%;
        cursor: default;
    }

    & .swiper-slide {
        padding: 8px 0;
        display: flex;
        align-items: center;
        width: 100% !important;

        & > span {
            margin-left: 16px;
        }
    }

    & .main-slide > span.complete {
        color: silver;
    }

    & .delete-slide,
    & .archive-slide,
    & .complete-slide {
        color: white;
    }
    & .archive-slide,
    & .complete-slide {
        justify-content: flex-end;
        & > span {
            margin-right: 16px;
        }
    }
    & .delete-slide {
        justify-content: flex-start;
        background: tomato;
    }
    & .archive-slide {
        background: orange;
    }
    & .complete-slide {
        background: limegreen;
    }
}

.task-item-wrapper:not(:last-child) {
    border-bottom: none !important;
}
</style>