using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Blazor.FileReader;
using Blazored.LocalStorage;
using ITLab.TestFront.Models;
using ITLab.TestFront.RemoteApi;
using ITLab.TestFront.Services;
using Markdig;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ITLab.TestFront
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
            services.AddServerSideBlazor().AddHubOptions(o =>
            {
                o.MaximumReceiveMessageSize = 40 * 1024 * 1024; // 40 MB
            });
            services.AddBlazoredLocalStorage();
            var markdownPipeline = new MarkdownPipelineBuilder()
                .DisableHtml()
                .Build();
            services.AddSingleton(markdownPipeline);
            services.AddFileReaderService();
            services.AddScoped<UserInfoPool>();
            services.AddScoped<ConnectionStrings>();
            services.AddTransient<IUsersApi>(s =>
            {
                var strings = s.GetService<ConnectionStrings>();
                var refitSettings = new Refit.RefitSettings
                {
                    AuthorizationHeaderValueGetter = () => Task.FromResult(strings.Token)
                };
                return Refit.RestService.For<IUsersApi>(Configuration.GetConnectionString("UsersApiBase"), refitSettings);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }
            app.UsePathBase("/test");
            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapBlazorHub();
                endpoints.MapFallbackToPage("/_Host");
            });
        }
    }
}
