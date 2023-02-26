gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


 gsap.to("#abc",{
  scrollTrigger:{
      trigger:"#main2",
      scroller:"#main",
      start:"top 5%",
      end:"",
      scrub:2,
      pin:"#main2",
      
      scroll:"smooth"
     

  },
  onUpdate:()=>{
   var img = document.querySelector("#abc");
   var client = img.getBoundingClientRect().top;
  
    var val =client*0.08;
  var scale = Math.floor(img.getBoundingClientRect().top*0.009);
  var scl = gsap.utils.mapRange(10, -10, 1, 2,scale);

  if(val>=-41.33171875){
   img.style.transform=`translate(-50%,0%) rotate3d(1,1,0,${client*0.08}deg) scale(${scl})`
  }

 },

  top:"-30%",
  duration:2,
 
 })
 gsap.to(".text h1",{
   scrollTrigger:{
     trigger:"#main2",
     scroller:"#main",
     start:"top 60%",
  

 },
   x:"-100%",
   duration:3,
   repeat:-1,
   ease: "linear"
 })

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var txt = document.querySelectorAll(".txt");

txt.forEach(function(elem){
  elem.addEventListener("mousemove",function(dets){
    this.children[0].style.opacity=1;
   
  })
  elem.addEventListener("mouseout",function(dets){
    this.children[0].style.opacity=0;
   
  })
})

var animate = document.querySelectorAll(".animate");
gsap.set(animate,{opacity:0})
animate.forEach(function(elem){
  gsap.to(elem,{
    scrollTrigger:{
      trigger:elem,
      scroller:"#main",
      start:"top 93%",
    
    },
    opacity:1,
    onStart:function(){
      $(elem).textillate({
        in:{
          effect:`fadeInUp`,
          duration:3
        }
      })
    }
  })
});