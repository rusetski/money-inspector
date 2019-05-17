(function () {
    'use strict';

    angular
        .module('app')
        .service('piechartService', piechartService);

    function piechartService() {
        var service = {
            drawPiechart: function (options) {
                this.options = options;
                this.canvas = options.canvas;
                this.size = this.canvas.offsetWidth;
                this.canvas.width = this.size;
                this.canvas.height = this.size;
                this.ctx = this.canvas.getContext("2d");
                this.colors = options.colors;
                var colorIndex = 0;
                var startAngle = 0;

                

                function drawPiechartPart(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                    ctx.closePath();
                    ctx.fill();
                }

                for (var i = 0; i < this.options.data.length; i++) {
                    var val = this.options.data[i].percent;
                    var sliceAngle = 2 * Math.PI * val / 100;

                    drawPiechartPart(
                        this.ctx,
                        this.canvas.width / 2,
                        this.canvas.height / 2,
                        Math.min(this.canvas.width / 2, this.canvas.height / 2),
                        startAngle,
                        startAngle + sliceAngle,
                        this.colors[colorIndex % this.colors.length]
                    );

                    startAngle += sliceAngle;
                    colorIndex++;
                }
                drawPiechartPart(
                    this.ctx,
                    this.canvas.width / 2,
                    this.canvas.height / 2,
                    0.5 * Math.min(this.canvas.width / 2, this.canvas.height / 2),
                    0,
                    2 * Math.PI,
                    "#fff"
                );
            }
        }
        return service;
    }
})();