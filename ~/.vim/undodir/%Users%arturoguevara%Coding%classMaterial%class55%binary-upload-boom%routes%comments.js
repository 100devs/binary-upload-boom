Vim�UnDo� H/�è�|�j���R֚�?����l&��k�� �      Nrouter.post("/createPost", upload.single("file"), postsController.createPost);                             c#�    _�                             ����                                                                                                                                                                                                                                                                                                                                                             c#�     �                /const upload = require("../middleware/multer");5��                          E       0               5�_�                           ����                                                                                                                                                                                                                                                                                                                                         
       v   
    c#�)     �               8const postsController = require("../controllers/posts");5��                        K                     5�_�                       3    ����                                                                                                                                                                                                                                                                                                                                         
       v   
    c#�2     �               ;const commentsController = require("../controllers/posts");5��       3                 x                     �       3                 x                     �       3                 x                     �       3                 x                     �       3                 x                     �       3                 x                     5�_�                       ;    ����                                                                                                                                                                                                                                                                                                                                         
       v   
    c#�5     �               >const commentsController = require("../controllers/comments");5��       3                 x                     5�_�                       7    ����                                                                                                                                                                                                                                                                                                                                         
       v   
    c#�C     �                8router.get("/:id", ensureAuth, postsController.getPost);5��                          �       9               5�_�                    
        ����                                                                                                                                                                                                                                                                                                                            
                      V        c#�F     �   	   
          6router.put("/likePost/:id", postsController.likePost);       =router.delete("/deletePost/:id", postsController.deletePost);5��    	                      <      v               5�_�                           ����                                                                                                                                                                                                                                                                                                                            
           
           V        c#�M     �      	         Nrouter.post("/createPost", upload.single("file"), postsController.createPost);5��                                             5�_�      	                     ����                                                                                                                                                                                                                                                                                                                                         2       v   2    c#�U     �      	         Qrouter.post("/createComment", upload.single("file"), postsController.createPost);5��                         
                     5�_�      
           	          ����                                                                                                                                                                                                                                                                                                                                         2       v   2    c#�V     �      	         <router.post("/createComment", , postsController.createPost);5��                         
                     5�_�   	              
          ����                                                                                                                                                                                                                                                                                                                                         2       v   2    c#�W     �      	         ;router.post("/createComment",  postsController.createPost);5��                         
                     5�_�   
                        ����                                                                                                                                                                                                                                                                                                                                         "       v   "    c#�d     �      	         :router.post("/createComment", postsController.createPost);5��                        
                    5�_�                       7    ����                                                                                                                                                                                                                                                                                                                                         "       v   "    c#�k    �      	         =router.post("/createComment", commentsController.createPost);5��       7                 #                    5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c#�    �      	         @router.post("/createComment", commentsController.createComment);5��                                              5��