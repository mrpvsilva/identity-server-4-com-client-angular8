using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApplication1
{
    public class Config
    {
        // scopes define the resources in your system
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            // client credentials client
            return new List<Client>
            {
                // OpenID Connect implicit flow client (MVC)
                new Client
                {
                    ClientId = "angular",
                    ClientName = "Angular Client",
                    AccessTokenType = AccessTokenType.Reference,
                    AccessTokenLifetime = 330,
                    IdentityTokenLifetime=30,
                    RequireClientSecret = false,
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    AllowAccessTokensViaBrowser= true,
                    RequireConsent = false,
                    RedirectUris = { "http://localhost:4200","http://localhost:4200/callback","http://localhost:4200/silent-renew.html" },
                    PostLogoutRedirectUris={ "http://localhost:4200","http://localhost:4200/callback", "http://localhost:4200/login"},
                    AllowedCorsOrigins={"http://localhost:4200"},
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile
                    }
                }
            };
        }

        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "bruno",
                    Password = "1234",
                    Claims = new List<Claim>
                    {
                        new Claim("name", "Bruno"),
                        new Claim(JwtClaimTypes.GivenName, "Bruno Brito"),
                        new Claim(JwtClaimTypes.FamilyName, "Brito"),
                        new Claim(JwtClaimTypes.Email, "bhdebrito@gmail.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim(JwtClaimTypes.WebSite, "http://www.saindodacaixinha.com.br"),
                        new Claim(JwtClaimTypes.Address, @"{ 'street_address': 'Av Paulista', 'locality': 'Sao Paulo', 'postal_code': 0332303, 'country': 'Brazil' }", IdentityServerConstants.ClaimValueTypes.Json)

                    }
                }
            };
        }
    }

}

