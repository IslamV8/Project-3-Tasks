base URL: https://project-3-tasks.vercel.app/api

==============================================================================


Method	            Path	          Auth	        Description


POST	          /auth/signup	         No	     تسجيل مستخدم جديد

POST	         /auth/login             No	      تسجيل دخول وإرجاع JWT

GET	           /boards?page=&limit=	    Yes    	جلب بورداتك مع pagination

POST	            /boards	            Yes        	إنشاء بورد جديد

GET	            /boards/:id            	Yes	        جلب بورد واحد وتاسكاته

PUT	                /boards/:id     	Yes	            تعديل بورد

DELETE	            /boards/:id	        Yes    	حذف بورد وتاسكاته

GET	         /tasks?status=&search=    	Yes	        جلب تاسكات بفلتر وبحث

POST            	/tasks          	Yes   	إنشاء مهمة جديدة ({ boardId })

PUT         	/tasks/:id          	Yes         	تعديل مهمة

DELETE      	/tasks/:id          	Yes	                حذف مهمة

==============================================================================

Headers

كل الـ routes اللي فيها Yes في Auth لازم يجي معها:

Authorization: Bearer <JWT token>

==============================================================================

Content-Type لكل POST/PUT:


Content-Type: application/json

==============================================================================


 Swagger


Swagger: https://project-3-tasks.vercel.app/api/docs