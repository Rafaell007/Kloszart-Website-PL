


  export function initCommentsScroll(){

window.addEventListener("load", () => {
  const columns = gsap.utils.toArray(".comments-column");
  const loops = columns.map((column, i) => {
    const items = gsap.utils.toArray(".item", column);
    return horizontalLoop(items, {
      repeat: -1,
      paddingRight: 10,
      paused: false
    });
  });
  // Stały automatyczny ruch: lewo → prawo, niezależnie od scrolla myszy/toucha.
  // W tym helperze dodatni kierunek timeline'u przesuwa elementy "w lewo",
  // więc do ruchu "w prawo" ustawiamy ujemny timeScale.
  gsap.set(loops, {
    time: (i) => (i % 2) + 1,
    timeScale: -0.6
  });
  gsap.set(columns, { autoAlpha: 1 });
});

/*
      This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
    
      Features:
        - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
        - When each item animates left or right enough, it will loop back to the other side
        - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, enterAnimation, leaveAnimation, and paddingRight.
        - The returned timeline will have the following methods added to it:
        - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
        - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
        - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
        - current() - returns the current index (if an animation is in-progress, it reflects the final index)
        - times - an Array of the times on the timeline where each element hits the "starting" spot.
        - elements - an Array of the elements that are being controlled by the timeline
    */
function horizontalLoop(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => {
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          onChange &&
          function () {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100)
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      center = config.center,
      clone = (obj) => {
        let result = {},
          p;
        for (p in obj) {
          result[p] = obj[p];
        }
        return result;
      },
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      timeOffset = 0,
      container =
        center === true
          ? items[0].parentNode
          : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(),
          b2;
        startX = items[0].offsetLeft;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
              gsap.getProperty(el, "xPercent")
          );
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, {
          xPercent: (i) => xPercents[i]
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center
          ? (tl.duration() * (container.offsetHeight / 2)) / totalWidth
          : 0;
        center &&
          times.forEach((t, i) => {
            times[i] = timeWrap(
              tl.labels["label" + i] +
                (tl.duration() * widths[i]) / 2 / totalWidth -
                timeOffset
            );
          });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0,
          d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(
            item,
            {
              xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond
            },
            0
          )
            .fromTo(
              item,
              {
                xPercent: snap(
                  ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                )
              },
              {
                xPercent: xPercents[i],
                duration:
                  (curX - distanceToLoop + totalWidth - curX) /
                  pixelsPerSecond,
                immediateRender: false
              },
              distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      customAnimations = () => {
        let { enterAnimation, leaveAnimation } = config,
          eachDuration = tl.duration() / items.length;
        items.forEach((item, i) => {
          let anim = enterAnimation && enterAnimation(item, eachDuration, i),
            isAtEnd =
              anim &&
              tl.duration() -
                timeWrap(times[i] - Math.min(eachDuration, anim.duration())) <
                eachDuration - 0.05;
          anim &&
            tl.add(anim, isAtEnd ? 0 : timeWrap(times[i] - anim.duration()));
          anim = leaveAnimation && leaveAnimation(item, eachDuration, i);
          isAtEnd = times[i] === tl.duration();
          anim && anim.duration() > eachDuration && anim.duration(eachDuration);
          anim && tl.add(anim, isAtEnd ? 0 : times[i]);
        });
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        customAnimations();
        deep && tl.draggable
          ? tl.time(times[curIndex], true)
          : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy;
    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    customAnimations();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = clone(vars);
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (vars.revolutions) {
        time += tl.duration() * Math.round(vars.revolutions);
        delete vars.revolutions;
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return tl.tweenTo(time, vars);
    }
    tl.elements = items;
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent) => {
      let index = getClosest(times, tl.time(), tl.duration());
      setCurrent && (curIndex = index);
      return index;
    };
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      let wrap = gsap.utils.wrap(0, 1),
        ratio,
        startProgress,
        draggable,
        dragSnap,
        align = () =>
          tl.progress(
            wrap(startProgress + (draggable.startX - draggable.x) * ratio)
          ),
        syncIndex = () => tl.closestIndex(true);
      typeof InertiaPlugin === "undefined" &&
        console.warn(
          "InertiaPlugin required for momentum-based scrolling and snapping. https://gsap.com/pricing"
        );
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          gsap.killTweensOf(tl);
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        inertia: true,
        snap: (value) => {
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 &&
            (dif += dif < 0 ? tl.duration() : -tl.duration());
          return (time + dif) / tl.duration() / -ratio;
        },
        onRelease: syncIndex,
        onThrowComplete: syncIndex
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize);
  });
  return timeline;
}
}