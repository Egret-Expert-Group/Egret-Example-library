namespace coreElement {

    export class Game extends BaseTest {
        public static GROUND: number = 300;
        public static G: number = 0.6;
        public static instance: Game = null;

        public factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();

        private _left: boolean = false;
        private _right: boolean = false;
        private _player: Mecha = null;

        public constructor() {
            super();

            Game.instance = this; 

            this._resourceConfigURL = "resource/CoreElement.json";
            //this._resourceConfigURL = "resource/warrior.json";
        }

        protected createGameScene(): void {
            Game.GROUND = this.stage.stageHeight - 100;

            this.factory.parseDragonBonesData(RES.getRes("dragonBonesData"));
            this.factory.parseTextureAtlasData(RES.getRes("textureDataA"), RES.getRes("textureA"));

            this.stage.addEventListener(egret.Event.ENTER_FRAME, this._enterFrameHandler, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchHandler, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this._touchHandler, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this._touchHandler, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._touchHandler, this);

            document.addEventListener("keydown", this._keyHandler);
            
            document.addEventListener("keyup", this._keyHandler);

            // mouse move        
            let onTouchMove = egret.sys.TouchHandler.prototype.onTouchMove;
            egret.sys.TouchHandler.prototype.onTouchMove = function (x: number, y: number, touchPointID: number): void {
                onTouchMove.call(this, x, y, touchPointID);

                Game.instance._player.aim(x, y);
            }

            this._player = new Mecha();

            const text = new egret.TextField();
            text.x = 0;
            text.y = this.stage.stageHeight - 60;
            text.width = this.stage.stageWidth;
            text.textAlign = egret.HorizontalAlign.CENTER;
            text.size = 20;
            text.text = "Press W/A/S/D to move. Press Q/E/SPACE to switch weapons.\nMouse Move to aim. Click to fire.";
            this.addChild(text);
        }

        private _touchHandler(event: egret.TouchEvent): void {
            this._player.aim(event.stageX, event.stageY);

            if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
                this._player.attack(true);
            } else {
                this._player.attack(false);
            }
        }

        private _keyHandler(event: KeyboardEvent): void {
            const isDown: boolean = event.type == "keydown";
            switch (event.keyCode) {
                case 37:
                case 65:
                    Game.instance._left = isDown;
                    Game.instance._updateMove(-1);
                    break;

                case 39:
                case 68:
                    Game.instance._right = isDown;
                    Game.instance._updateMove(1);
                    break;

                case 38:
                case 87:
                    if (isDown) {
                        Game.instance._player.jump();
                    }
                    break;

                case 83:
                case 40:
                    Game.instance._player.squat(isDown);
                    break;

            }
        }

        private _enterFrameHandler(event: dragonBones.EgretEvent): void {
            this._player.update();

            dragonBones.WorldClock.clock.advanceTime(-1);
        }

        private _updateMove(dir: number): void {
            if (this._left && this._right) {
                this._player.move(dir);
            } else if (this._left) {
                this._player.move(-1);
            } else if (this._right) {
                this._player.move(1);
            } else {
                this._player.move(0);
            }
        }
    }

    class Mecha {
        /// ["idle", "walk", "attack_01", "attack_02", "attack_02_1", "death", "hit", "jump_1", "jump_2", "jump_3", "jump_4", "squat", "aimUp", "aimDown"]
        private static NORMAL_ANIMATION_GROUP: string = "normal";
        private static AIM_ANIMATION_GROUP: string = "aim";
        private static ATTACK_ANIMATION_GROUP: string = "attack";
        private static JUMP_SPEED: number = 20;
        private static NORMALIZE_MOVE_SPEED: number = 3.6;
        private static MAX_MOVE_SPEED_FRONT: number = Mecha.NORMALIZE_MOVE_SPEED * 1.4;
        private static MAX_MOVE_SPEED_BACK: number = Mecha.NORMALIZE_MOVE_SPEED * 1.0;
        private static WEAPON_R_LIST: Array<string> = ["weapon_1502b_r", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d", "weapon_1005e"];
        private static WEAPON_L_LIST: Array<string> = ["weapon_1502b_l", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d"];

        private _isJumpingA: boolean = false;
        private _isJumpingB: boolean = false;
        private _isSquating: boolean = false;
        private _isAttackingA: boolean = false;
        private _isAttackingB: boolean = false;
        private _faceDir: number = 1;
        private _aimDir: number = 0;
        private _moveDir: number = 0;
        private _speedX: number = 0;
        private _speedY: number = 0;
        private _armature: dragonBones.Armature = null;
        private _armatureDisplay: dragonBones.EgretArmatureDisplay = null;
        private _walkState: dragonBones.AnimationState = null;
        private _attackState: dragonBones.AnimationState = null;
        private _target: egret.Point = new egret.Point();

        public constructor() {
            this._armature = Game.instance.factory.buildArmature("mecha_1502b");
            console.log( "动画列表:", this._armature.animation.animationList );
            //return
            
            this._armatureDisplay = <dragonBones.EgretArmatureDisplay>this._armature.display;
            this._armatureDisplay.x = Game.instance.stage.stageWidth * 0.5;
            this._armatureDisplay.y = Game.GROUND;
            this._armatureDisplay.scaleX = this._armatureDisplay.scaleY = 1;
            this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
            this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);

            // Mecha effects only controled by normalAnimation.
            this._armature.getSlot("effects_1").displayController = Mecha.NORMAL_ANIMATION_GROUP;
            this._armature.getSlot("effects_2").displayController = Mecha.NORMAL_ANIMATION_GROUP;

            this._updateAnimation();

            Game.instance.addChild(this._armatureDisplay);
            dragonBones.WorldClock.clock.add(this._armature);
        }

        public move(dir: number): void {
            if (this._moveDir == dir) {
                return;
            }

            this._moveDir = dir;
            this._updateAnimation();
        }

        public jump(): void {
            if (this._isJumpingA) {
                return;
            }

            this._isJumpingA = true;
            this._armature.animation.fadeIn("jump_1", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
            this._walkState = null;
        }

        public squat(isSquating: boolean): void {
            if (this._isSquating == isSquating) {
                return;
            }

            this._isSquating = isSquating;
            this._updateAnimation();
        }

        public attack(isAttacking: boolean): void {
            if (this._isAttackingA == isAttacking) {
                return;
            }

            this._isAttackingA = isAttacking;
        }

        public aim(x: number, y: number): void {
            if (this._aimDir == 0) {
                this._aimDir = 10;
            }

            this._target.setTo(x, y);
        }

        public update(): void {
            this._updatePosition();
            //this._updateAim();
            this._updateAttack();
        }

        private _animationEventHandler(event: dragonBones.EgretEvent): void {
            switch (event.type) {
                case dragonBones.EventObject.FADE_IN_COMPLETE:
                    if (event.eventObject.animationState.name == "jump_1") {
                        this._isJumpingB = true;
                        this._speedY = -Mecha.JUMP_SPEED;
                        this._armature.animation.fadeIn("jump_2", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
                    } else if (event.eventObject.animationState.name == "jump_4") {
                        this._updateAnimation();
                    }
                    break;

                case dragonBones.EventObject.FADE_OUT_COMPLETE:
                    if (event.eventObject.animationState.name == "attack_01") {
                        this._isAttackingB = false;
                        this._attackState = null;
                    }
                    break;
            }
        }

        private _updateAnimation(): void {
            if (this._isJumpingA) {
                return;
            }

            if (this._isSquating) {
                this._speedX = 0;
                this._armature.animation.fadeIn("squat", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
                this._walkState = null;
                return;
            }

            if (this._moveDir == 0) {
                this._speedX = 0;
                this._armature.animation.fadeIn("idle", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
                this._walkState = null;
            } else {
                if (!this._walkState) {
                    this._walkState = this._armature.animation.fadeIn("walk", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
                }

                if (this._moveDir * this._faceDir > 0) {
                    this._walkState.timeScale = Mecha.MAX_MOVE_SPEED_FRONT / Mecha.NORMALIZE_MOVE_SPEED;
                } else {
                    this._walkState.timeScale = -Mecha.MAX_MOVE_SPEED_BACK / Mecha.NORMALIZE_MOVE_SPEED;
                }

                if (this._moveDir * this._faceDir > 0) {
                    this._speedX = Mecha.MAX_MOVE_SPEED_FRONT * this._faceDir;
                } else {
                    this._speedX = -Mecha.MAX_MOVE_SPEED_BACK * this._faceDir;
                }
            }
        }

        private _updatePosition(): void {
            if (this._speedX != 0) {
                this._armatureDisplay.x += this._speedX;
                if (this._armatureDisplay.x < 0) {
                    this._armatureDisplay.x = 0;
                } else if (this._armatureDisplay.x > Game.instance.stage.stageWidth) {
                    this._armatureDisplay.x = Game.instance.stage.stageWidth;
                }
            }

            if (this._speedY != 0) {
                if (this._speedY < 5 && this._speedY + Game.G >= 5) {
                    this._armature.animation.fadeIn("jump_3", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
                }

                this._speedY += Game.G;

                this._armatureDisplay.y += this._speedY;
                if (this._armatureDisplay.y > Game.GROUND) {
                    this._armatureDisplay.y = Game.GROUND;
                    this._isJumpingA = false;
                    this._isJumpingB = false;
                    this._speedY = 0;
                    this._speedX = 0;
                    this._armature.animation.fadeIn("jump_4", -1, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
                    if (this._isSquating || this._moveDir) {
                        this._updateAnimation();
                    }
                }
            }
        }

        private _updateAttack(): void {
            if (!this._isAttackingA || this._isAttackingB) {
                return;
            }

            this._isAttackingB = true;

            // Animation mixing.
            this._attackState = this._armature.animation.fadeIn(
                "attack_01", -1, -1,
                0, Mecha.ATTACK_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup
            );

            this._attackState.autoFadeOutTime = this._attackState.fadeTotalTime;
            this._attackState.addBoneMask("pelvis");
        }
    }
}