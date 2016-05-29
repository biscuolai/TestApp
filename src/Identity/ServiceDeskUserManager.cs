﻿//using System;
//using Microsoft.AspNet.Identity;
//using DLGP_SVDK.Identity.Model;

//namespace DLGP_SVDK.Identity
//{
//    public class ServiceDeskUserManager : UserManager<ServiceDeskUser>
//    {
//        public ServiceDeskUserManager(IUserStore<ServiceDeskUser> store)
//            : base(store)
//        {
//            ConfigureUserManager();
//        }

//        //public UserDisplayInfoCache InfoCache { get { return new UserDisplayInfoCache(this); } }

//        public bool IsTdHelpDeskUser(string userId)
//        {
//            return this.IsInRole(userId, "TdHelpDeskUsers") || IsTdAdministrator(userId);
//        }

//        public bool IsTdInternalUser(string userId)
//        {
//            return this.IsInRole(userId, "TdInternalUsers") || IsTdHelpDeskUser(userId);
//        }

//        public bool IsTdAdministrator(string userId)
//        {
//            return this.IsInRole(userId, "TdAdministrators");
//        }

//        public bool IsTdPendingUser(string userId)
//        {
//            return this.IsInRole(userId, "TdPendingUsers");
//        }

//        private void ConfigureUserManager()
//        {
//            UserValidator = new UserValidator<ServiceDeskUser>(this)
//            {
//                AllowOnlyAlphanumericUserNames = false,
//                RequireUniqueEmail = true
//            };

//            // Configure validation logic for passwords
//            PasswordValidator = new PasswordValidator
//            {
//                RequiredLength = 5,
//                RequireNonLetterOrDigit = false,
//                RequireDigit = false,
//                RequireLowercase = false,
//                RequireUppercase = false,
//            };

//            // Configure user lockout defaults
//            UserLockoutEnabledByDefault = true;
//            DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
//            MaxFailedAccessAttemptsBeforeLockout = 5;
//        }
//    }
//}